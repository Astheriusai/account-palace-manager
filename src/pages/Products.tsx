
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Package, Plus, Pencil } from "lucide-react";
import { getProducts, Product, updateProduct } from "@/services/productService";
import { useToast } from "@/hooks/use-toast";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
        toast({
          title: "Error al cargar productos",
          description: "No se pudieron cargar los productos. Intente nuevamente.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [toast]);

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setOpen(true);
  };

  const handleNewProduct = () => {
    toast({
      title: "Funcionalidad en desarrollo",
      description: "La creación de nuevos productos estará disponible próximamente.",
    });
  };

  const handleSaveProduct = async () => {
    if (!currentProduct) return;
    
    try {
      await updateProduct(currentProduct);
      setProducts(products.map(p => p.id === currentProduct.id ? currentProduct : p));
      toast({
        title: "Producto actualizado",
        description: "Los cambios han sido guardados correctamente.",
      });
      setOpen(false);
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error al actualizar",
        description: "No se pudo actualizar el producto. Intente nuevamente.",
        variant: "destructive",
      });
    }
  };

  const handleManageAccounts = (productId: string) => {
    navigate(`/accounts?productId=${productId}`);
  };

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
        <Button className="gap-2" onClick={handleNewProduct}>
          <Plus className="h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="opacity-60 animate-pulse">
              <CardHeader className="pb-3">
                <div className="h-7 bg-muted rounded mb-2 w-1/2"></div>
                <div className="h-5 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-muted"></div>
                    <div>
                      <div className="h-4 bg-muted rounded w-20 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-32"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.length > 0 ? (
            products.map((product) => (
              <Card key={product.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>{product.name}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>{product.maxProfiles} perfiles máximo por cuenta</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Package className="h-10 w-10 text-primary/80" />
                      <div>
                        <p className="text-sm font-medium">Duración estándar:</p>
                        <p className="text-sm text-muted-foreground">{product.durations.join(', ')}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleManageAccounts(product.id)}>
                      Gestionar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium">No hay productos disponibles</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Añade tu primer producto para comenzar a gestionarlo.
              </p>
              <Button onClick={handleNewProduct}>
                <Plus className="h-4 w-4 mr-2" />
                Añadir producto
              </Button>
            </div>
          )}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
            <DialogDescription>
              Actualiza los detalles del producto seleccionado.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                value={currentProduct?.name || ""}
                onChange={(e) => setCurrentProduct(currentProduct ? {...currentProduct, name: e.target.value} : null)}
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
                value={currentProduct?.maxProfiles || 0}
                onChange={(e) => setCurrentProduct(currentProduct ? {
                  ...currentProduct, 
                  maxProfiles: parseInt(e.target.value)
                } : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="durations" className="text-right">
                Duraciones
              </Label>
              <Input
                id="durations"
                value={currentProduct?.durations.join(', ') || ""}
                onChange={(e) => setCurrentProduct(currentProduct ? {
                  ...currentProduct, 
                  durations: e.target.value.split(',').map(d => d.trim())
                } : null)}
                className="col-span-3"
                placeholder="1 mes, 3 meses, 6 meses"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="active" className="text-right">
                Activo
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="active"
                  checked={currentProduct?.active || false}
                  onCheckedChange={(checked) => setCurrentProduct(currentProduct ? {
                    ...currentProduct, 
                    active: checked
                  } : null)}
                />
                <Label htmlFor="active">
                  {currentProduct?.active ? "Producto Activo" : "Producto Inactivo"}
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveProduct}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
