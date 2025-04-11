
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
import { MoreHorizontal, Plus, Search, Clock, Send, Pencil, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Sales() {
  const sales = [
    { id: 1, date: "10-04-2025", client: "Juan Pérez", service: "Netflix", duration: "3 meses", price: "$29.99", expiration: "10-07-2025" },
    { id: 2, date: "08-04-2025", client: "María López", service: "Disney+", duration: "6 meses", price: "$49.99", expiration: "08-10-2025" },
    { id: 3, date: "05-04-2025", client: "Carlos Ruiz", service: "HBO Max", duration: "1 mes", price: "$14.99", expiration: "05-05-2025" },
    { id: 4, date: "01-04-2025", client: "Ana Gómez", service: "Netflix", duration: "12 meses", price: "$99.99", expiration: "01-04-2026" },
    { id: 5, date: "28-03-2025", client: "Roberto Silva", service: "Amazon Prime", duration: "3 meses", price: "$24.99", expiration: "28-06-2025" },
  ];

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Ventas</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
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
          />
        </div>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Servicio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los servicios</SelectItem>
              <SelectItem value="netflix">Netflix</SelectItem>
              <SelectItem value="disney">Disney+</SelectItem>
              <SelectItem value="hbo">HBO Max</SelectItem>
              <SelectItem value="amazon">Amazon Prime</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">Filtrar</Button>
        </div>
      </div>

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
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.id}</TableCell>
                <TableCell>{sale.date}</TableCell>
                <TableCell className="font-medium">{sale.client}</TableCell>
                <TableCell>{sale.service}</TableCell>
                <TableCell>{sale.duration}</TableCell>
                <TableCell>{sale.price}</TableCell>
                <TableCell>{sale.expiration}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Mostrando 5 de 35 ventas
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
    </PageLayout>
  );
}
