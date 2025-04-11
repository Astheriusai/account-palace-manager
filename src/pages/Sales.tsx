
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { 
  MoreHorizontal, 
  Plus, 
  Search, 
  Clock, 
  Send, 
  Pencil, 
  Trash2,
  Loader2 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSales } from "@/services/salesService";
import { getClients } from "@/services/clientService";
import { getProducts } from "@/services/productService";
import NewSaleDialog from "@/components/sales/NewSaleDialog";

export default function Sales() {
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);

  // Fetch sales data
  const { data: sales = [], isLoading: isLoadingSales } = useQuery({
    queryKey: ['sales'],
    queryFn: getSales,
  });

  // Fetch clients for the new sale dialog
  const { data: clients = [], isLoading: isLoadingClients } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  });

  // Fetch products for the new sale dialog
  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  // Filter sales based on search term and service filter
  const filteredSales = sales.filter(sale => {
    const matchesSearch = 
      sale.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.service_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = serviceFilter === "all" || sale.service_id === serviceFilter;

    return matchesSearch && matchesFilter;
  });

  // Get unique services for the filter dropdown
  const uniqueServices = [...new Set(sales.map(sale => ({ id: sale.service_id, name: sale.service_name })))];

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Ventas</h1>
        <Button 
          className="gap-2"
          onClick={() => setIsNewSaleOpen(true)}
          disabled={isLoadingClients || isLoadingProducts}
        >
          {(isLoadingClients || isLoadingProducts) ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          Nueva Venta
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <div className="relative flex-1 w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar venta..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Select 
            value={serviceFilter}
            onValueChange={setServiceFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Servicio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los servicios</SelectItem>
              {uniqueServices.map(service => (
                <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoadingSales ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Duración</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Vencimiento</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No se encontraron ventas
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>{sale.id.substring(0, 8)}...</TableCell>
                      <TableCell>{sale.created_at}</TableCell>
                      <TableCell className="font-medium">{sale.client_name}</TableCell>
                      <TableCell>{sale.service_name}</TableCell>
                      <TableCell>{sale.duration}</TableCell>
                      <TableCell>${sale.price.toFixed(2)}</TableCell>
                      <TableCell>{sale.expiration_date}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Clock className="h-4 w-4" /> Añadir tiempo
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Pencil className="h-4 w-4" /> Editar venta
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Send className="h-4 w-4" /> Enviar recordatorio
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <Trash2 className="h-4 w-4" /> Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {filteredSales.length > 0 && (
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-muted-foreground">
                Mostrando {filteredSales.length} de {sales.length} ventas
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm">
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </>
      )}
      
      {/* New Sale Dialog */}
      <NewSaleDialog
        open={isNewSaleOpen}
        onOpenChange={setIsNewSaleOpen}
        clients={clients}
        products={products}
      />
    </PageLayout>
  );
}
