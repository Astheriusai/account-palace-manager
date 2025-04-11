
import { Button } from "@/components/ui/button";
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
import { Product } from "@/services/productService";
import { useState, useEffect } from "react";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSave: (product: Product) => void;
}

export function ProductDialog({ open, onOpenChange, product, onSave }: ProductDialogProps) {
  const [editedProduct, setEditedProduct] = useState<Product | null>(product);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  if (!editedProduct) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              value={editedProduct.name}
              onChange={(e) => setEditedProduct({...editedProduct, name: e.target.value})}
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
              value={editedProduct.maxProfiles}
              onChange={(e) => setEditedProduct({
                ...editedProduct, 
                maxProfiles: parseInt(e.target.value)
              })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="durations" className="text-right">
              Duraciones
            </Label>
            <Input
              id="durations"
              value={editedProduct.durations.join(', ')}
              onChange={(e) => setEditedProduct({
                ...editedProduct, 
                durations: e.target.value.split(',').map(d => d.trim())
              })}
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
                checked={editedProduct.active}
                onCheckedChange={(checked) => setEditedProduct({
                  ...editedProduct, 
                  active: checked
                })}
              />
              <Label htmlFor="active">
                {editedProduct.active ? "Producto Activo" : "Producto Inactivo"}
              </Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={() => onSave(editedProduct)}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
