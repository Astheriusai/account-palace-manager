
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Pencil } from "lucide-react";
import { Product } from "@/services/productService";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export function ProductCard({ product, onEdit }: ProductCardProps) {
  const navigate = useNavigate();
  
  const handleManageAccounts = (productId: string, productName: string) => {
    navigate(`/accounts/${productId}`, { state: { productName } });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>{product.name}</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => onEdit(product)}>
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
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleManageAccounts(product.id, product.name)}
          >
            Gestionar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
