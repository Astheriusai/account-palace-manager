
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal, Plus, Search, UserCircle2, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

export default function Accounts() {
  const accounts = [
    { 
      id: 1, 
      service: "Netflix", 
      email: "cuenta1@netflix.com", 
      password: "●●●●●●●●", 
      purchaseDate: "15-01-2025", 
      expirationDate: "15-01-2026", 
      status: "available",
      profiles: [
        { id: 1, name: "Perfil 1", assigned: false },
        { id: 2, name: "Perfil 2", assigned: false },
        { id: 3, name: "Perfil 3", assigned: false },
        { id: 4, name: "Perfil 4", assigned: true },
        { id: 5, name: "Perfil 5", assigned: true },
      ]
    },
    { 
      id: 2, 
      service: "Disney+", 
      email: "cuenta1@disney.com", 
      password: "●●●●●●●●", 
      purchaseDate: "10-01-2025", 
      expirationDate: "10-01-2026", 
      status: "in-use",
      profiles: [
        { id: 1, name: "Perfil 1", assigned: true },
        { id: 2, name: "Perfil 2", assigned: true },
        { id: 3, name: "Perfil 3", assigned: true },
        { id: 4, name: "Perfil 4", assigned: true },
        { id: 5, name: "Perfil 5", assigned: true },
        { id: 6, name: "Perfil 6", assigned: true },
        { id: 7, name: "Perfil 7", assigned: true },
      ]
    },
    { 
      id: 3, 
      service: "HBO Max", 
      email: "cuenta1@hbomax.com", 
      password: "●●●●●●●●", 
      purchaseDate: "05-02-2025", 
      expirationDate: "05-02-2026", 
      status: "in-use",
      profiles: [
        { id: 1, name: "Perfil 1", assigned: true },
        { id: 2, name: "Perfil 2", assigned: false },
        { id: 3, name: "Perfil 3", assigned: false },
        { id: 4, name: "Perfil 4", assigned: true },
        { id: 5, name: "Perfil 5", assigned: false },
      ]
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <span className="status-active">Disponible</span>;
      case "in-use":
        return <span className="status-badge bg-info/20 text-info">En Uso</span>;
      case "expired":
        return <span className="status-inactive">Vencida</span>;
      default:
        return null;
    }
  };

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Cuentas</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Cuenta
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="available">Disponibles</TabsTrigger>
          <TabsTrigger value="in-use">En Uso</TabsTrigger>
          <TabsTrigger value="expired">Vencidas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
            <div className="relative flex-1 w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar cuenta..."
                className="pl-8"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Contraseña</TableHead>
                  <TableHead>Compra</TableHead>
                  <TableHead>Vencimiento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>{account.id}</TableCell>
                    <TableCell className="font-medium">{account.service}</TableCell>
                    <TableCell>{account.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{account.password}</span>
                        <Button variant="ghost" size="icon" className="h-5 w-5">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{account.purchaseDate}</TableCell>
                    <TableCell>{account.expirationDate}</TableCell>
                    <TableCell>{getStatusBadge(account.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Pencil className="h-4 w-4" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <UserCircle2 className="h-4 w-4" /> Gestionar Perfiles
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

          <div className="mt-6 space-y-4">
            {accounts.map((account) => (
              <Card key={account.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-muted/50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{account.service} - {account.email}</div>
                        <div className="text-sm text-muted-foreground">Vence: {account.expirationDate}</div>
                      </div>
                      <div>{getStatusBadge(account.status)}</div>
                    </div>
                  </div>
                  <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {account.profiles.map((profile) => (
                      <div key={profile.id} className={`p-3 rounded-md border text-center ${profile.assigned ? 'bg-muted/50' : 'bg-success/20'}`}>
                        <UserCircle2 className={`h-8 w-8 mx-auto ${profile.assigned ? 'text-muted-foreground' : 'text-success'}`} />
                        <div className="mt-2 text-sm font-medium">{profile.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {profile.assigned ? 'Asignado' : 'Disponible'}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="available">
          <div className="h-40 flex items-center justify-center bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">Filtro de cuentas disponibles</p>
          </div>
        </TabsContent>

        <TabsContent value="in-use">
          <div className="h-40 flex items-center justify-center bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">Filtro de cuentas en uso</p>
          </div>
        </TabsContent>

        <TabsContent value="expired">
          <div className="h-40 flex items-center justify-center bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">Filtro de cuentas vencidas</p>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
