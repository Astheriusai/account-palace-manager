
import { useEffect, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getProducts, Product, updateProduct } from "@/services/productService";
import { useToast } from "@/hooks/use-toast";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductSkeleton } from "@/components/products/ProductSkeleton";
import { EmptyProductState } from "@/components/products/EmptyProductState";
import { ProductDialog } from "@/components/products/ProductDialog";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
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

  const handleSaveProduct = async (product: Product) => {
    try {
      await updateProduct(product);
      setProducts(products.map(p => p.id === product.id ? product : p));
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
            <ProductSkeleton key={item} />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onEdit={handleEditProduct} 
              />
            ))
          ) : (
            <EmptyProductState onNewProduct={handleNewProduct} />
          )}
        </div>
      )}

      <ProductDialog 
        open={open} 
        onOpenChange={setOpen} 
        product={currentProduct} 
        onSave={handleSaveProduct} 
      />
    </PageLayout>
  );
}
