
import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Plus, Search, ShoppingBag, Pencil, Trash2 } from "lucide-react";
import { Client, getClients, deleteClient } from "@/services/clientService";
import ClientDialog from "@/components/clients/ClientDialog";
import DeleteClientDialog from "@/components/clients/DeleteClientDialog";
import { toast } from "sonner";

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [clientDialogOpen, setClientDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const fetchedClients = await getClients();
      setClients(fetchedClients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("No se pudieron cargar los clientes");
    } finally {
      setLoading(false);
    }
  };

  const handleClientSaved = (updatedClient: Client) => {
    if (selectedClient) {
      // Editing existing client
      setClients(prevClients => 
        prevClients.map(client => 
          client.id === updatedClient.id ? updatedClient : client
        )
      );
    } else {
      // Creating new client
      setClients(prevClients => [...prevClients, updatedClient]);
    }
    
    // Reset selected client
    setSelectedClient(null);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setClientDialogOpen(true);
  };

  const handleDeleteClick = (client: Client) => {
    setSelectedClient(client);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedClient) return;
    
    try {
      setIsDeleting(true);
      await deleteClient(selectedClient.id);
      
      // Remove client from state
      setClients(prevClients => 
        prevClients.filter(client => client.id !== selectedClient.id)
      );
      
      toast.success("Cliente eliminado con éxito");
      setDeleteDialogOpen(false);
      setSelectedClient(null);
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error("Error al eliminar el cliente");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (client.phone && client.phone.includes(searchTerm))
  );

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <Button className="gap-2" onClick={() => {
          setSelectedClient(null);
          setClientDialogOpen(true);
        }}>
          <Plus className="h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      <div className="flex items-center mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar cliente..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Compras</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.id.substring(0, 8)}...</TableCell>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email || "-"}</TableCell>
                  <TableCell>{client.phone || "-"}</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          className="gap-2 cursor-pointer"
                          onClick={() => handleEditClient(client)}
                        >
                          <Pencil className="h-4 w-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <ShoppingBag className="h-4 w-4" /> Ver compras
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="gap-2 text-destructive cursor-pointer"
                          onClick={() => handleDeleteClick(client)}
                        >
                          <Trash2 className="h-4 w-4" /> Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Cargando clientes...
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No se encontraron clientes
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" disabled>
          Anterior
        </Button>
        <Button variant="outline" size="sm">
          Siguiente
        </Button>
      </div>

      <ClientDialog 
        open={clientDialogOpen}
        onOpenChange={setClientDialogOpen}
        client={selectedClient || undefined}
        onClientSaved={handleClientSaved}
      />

      <DeleteClientDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        clientName={selectedClient?.name || ""}
        isDeleting={isDeleting}
      />
    </PageLayout>
  );
}
