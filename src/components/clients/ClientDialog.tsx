
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Client, CreateClientData, createClient, updateClient } from "@/services/clientService";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const clientSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
});

type ClientFormValues = z.infer<typeof clientSchema>;

interface ClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client?: Client; // The client to edit, if provided
  onClientSaved?: (client: Client) => void;
}

export default function ClientDialog({
  open,
  onOpenChange,
  client,
  onClientSaved,
}: ClientDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!client;

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name || "",
      email: client?.email || "",
      phone: client?.phone || "",
    },
  });

  // Reset form when dialog opens/closes or client changes
  useEffect(() => {
    if (open) {
      form.reset({
        name: client?.name || "",
        email: client?.email || "",
        phone: client?.phone || "",
      });
    }
  }, [open, client, form]);

  const handleClose = (open: boolean) => {
    if (!isSubmitting) {
      onOpenChange(open);
    }
  };

  async function onSubmit(data: ClientFormValues) {
    try {
      setIsSubmitting(true);
      
      let savedClient: Client;
      if (isEditing && client) {
        // Update existing client
        savedClient = await updateClient(client.id, {
          name: data.name,
          email: data.email || null,
          phone: data.phone || null,
        });
        toast.success("Cliente actualizado con éxito");
      } else {
        // Create new client
        savedClient = await createClient({
          name: data.name,
          email: data.email || null,
          phone: data.phone || null,
        });
        toast.success("Cliente creado con éxito");
      }
      
      if (onClientSaved) {
        onClientSaved(savedClient);
      }
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving client:", error);
      toast.error(isEditing ? "Error al actualizar el cliente" : "Error al crear el cliente");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Cliente" : "Nuevo Cliente"}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Modifica los datos del cliente." 
              : "Completa el formulario para agregar un nuevo cliente."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="cliente@ejemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123-456-7890"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
