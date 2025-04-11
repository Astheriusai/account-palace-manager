
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, MoreHorizontal, Upload, Key, Pencil, Trash2 } from "lucide-react";

type Service = {
  id: number;
  name: string;
  price: number;
  maxProfiles: number;
  active: boolean;
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: "Netflix", price: 14.99, maxProfiles: 5, active: true },
    { id: 2, name: "Disney+", price: 9.99, maxProfiles: 7, active: true },
    { id: 3, name: "HBO Max", price: 12.99, maxProfiles: 5, active: true },
    { id: 4, name: "Amazon Prime", price: 8.99, maxProfiles: 6, active: false },
    { id: 5, name: "Apple TV+", price: 6.99, maxProfiles: 6, active: true },
  ]);

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);

  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setCurrentService(service);
      setIsEdit(true);
    } else {
      setCurrentService({
        id: services.length + 1,
        name: "",
        price: 0,
        maxProfiles: 0,
        active: true,
      });
      setIsEdit(false);
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setCurrentService(null);
  };

  const handleSaveService = () => {
    if (!currentService) return;

    if (isEdit) {
      setServices(services.map(s => s.id === currentService.id ? currentService : s));
    } else {
      setServices([...services, currentService]);
    }
    handleCloseDialog();
  };

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Servicios</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Importar Cuentas
          </Button>
          <Button className="gap-2" onClick={() => handleOpenDialog()}>
            <PlusCircle className="h-4 w-4" />
            Nuevo Servicio
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Servicio</TableHead>
              <TableHead>Precio Base</TableHead>
              <TableHead>Perfiles Máx.</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.id}</TableCell>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>${service.price.toFixed(2)}</TableCell>
                <TableCell>{service.maxProfiles}</TableCell>
                <TableCell>
                  {service.active ? (
                    <span className="status-active">Activo</span>
                  ) : (
                    <span className="status-inactive">Inactivo</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenDialog(service)} className="gap-2">
                        <Pencil className="h-4 w-4" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Key className="h-4 w-4" /> Gestionar Cuentas
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="h-4 w-4" /> Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEdit ? "Editar Servicio" : "Nuevo Servicio"}</DialogTitle>
            <DialogDescription>
              {isEdit 
                ? "Actualiza los detalles del servicio seleccionado." 
                : "Completa los detalles para crear un nuevo servicio."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                value={currentService?.name || ""}
                onChange={(e) => setCurrentService(currentService ? {...currentService, name: e.target.value} : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Precio Base
              </Label>
              <Input
                id="price"
                type="number"
                value={currentService?.price || 0}
                onChange={(e) => setCurrentService(currentService ? {...currentService, price: parseFloat(e.target.value)} : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="maxProfiles" className="text-right">
                Perfiles Máx.
              </Label>
              <Input
                id="maxProfiles"
                type="number"
                value={currentService?.maxProfiles || 0}
                onChange={(e) => setCurrentService(currentService ? {...currentService, maxProfiles: parseInt(e.target.value)} : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="active" className="text-right">
                Activo
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="active"
                  checked={currentService?.active || false}
                  onCheckedChange={(checked) => setCurrentService(currentService ? {...currentService, active: checked} : null)}
                />
                <Label htmlFor="active">
                  {currentService?.active ? "Servicio Activo" : "Servicio Inactivo"}
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancelar
            </Button>
            <Button onClick={handleSaveService}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
