
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
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
import { 
  MoreHorizontal, 
  Plus, 
  Search, 
  UserCircle2, 
  Pencil, 
  Trash2, 
  Eye, 
  Loader2 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAccountsByProductId, Account } from "@/services/accountService";
import { getProduct } from "@/services/productService";

export default function ProductAccounts() {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const { productName } = location.state || { productName: "" };
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [productTitle, setProductTitle] = useState(productName || "");
  const { toast } = useToast();

  useEffect(() => {
    const loadProductData = async () => {
      if (!productId) return;

      try {
        setLoading(true);
        
        // If we don't have a product name from navigation state, fetch it
        if (!productName && productId) {
          const product = await getProduct(productId);
          if (product) {
            setProductTitle(product.name);
          }
        }
        
        const accountsData = await getAccountsByProductId(productId);
        setAccounts(accountsData);
      } catch (error) {
        console.error('Error loading product accounts:', error);
        toast({
          title: "Error al cargar cuentas",
          description: "No se pudieron cargar las cuentas para este producto.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
  }, [productId, productName, toast]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Disponible</span>;
      case "in-use":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">En Uso</span>;
      case "expired":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Vencida</span>;
      default:
        return null;
    }
  };

  const handleAddNewAccount = () => {
    toast({
      title: "Funcionalidad en desarrollo",
      description: "La creación de nuevas cuentas estará disponible próximamente.",
    });
  };

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Cuentas de {productTitle}
        </h1>
        <Button className="gap-2" onClick={handleAddNewAccount}>
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

          {loading ? (
            <div className="flex justify-center items-center p-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Cargando cuentas...</span>
            </div>
          ) : accounts.length > 0 ? (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
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
                        <TableCell>{account.id.substring(0, 8)}...</TableCell>
                        <TableCell className="font-medium">{account.email}</TableCell>
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
                            <div className="font-medium">{account.email}</div>
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
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-10 bg-muted/20 rounded-lg">
              <UserCircle2 className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No hay cuentas para este producto</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Añade tu primera cuenta para comenzar a gestionarla.
              </p>
              <Button onClick={handleAddNewAccount}>
                <Plus className="h-4 w-4 mr-2" />
                Añadir cuenta
              </Button>
            </div>
          )}
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
