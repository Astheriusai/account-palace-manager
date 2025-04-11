
import { Button } from "@/components/ui/button";
import { Package, Plus } from "lucide-react";

interface EmptyProductStateProps {
  onNewProduct: () => void;
}

export function EmptyProductState({ onNewProduct }: EmptyProductStateProps) {
  return (
    <div className="col-span-full text-center py-10">
      <Package className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
      <h3 className="text-lg font-medium">No hay productos disponibles</h3>
      <p className="text-sm text-muted-foreground mt-1 mb-4">
        Añade tu primer producto para comenzar a gestionarlo.
      </p>
      <Button onClick={onNewProduct}>
        <Plus className="h-4 w-4 mr-2" />
        Añadir producto
      </Button>
    </div>
  );
}
