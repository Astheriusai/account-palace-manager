
import { useEffect, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus } from "lucide-react";
import { getProducts, Product } from "@/services/productService";
import { useToast } from "@/hooks/use-toast";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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

  const handleNewProduct = () => {
    toast({
      title: "Funcionalidad en desarrollo",
      description: "La creación de nuevos productos estará disponible próximamente.",
    });
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
                  <CardTitle>{product.name}</CardTitle>
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
                    <Button variant="outline" size="sm">Gestionar</Button>
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
    </PageLayout>
  );
}
