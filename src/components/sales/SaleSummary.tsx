
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Client } from "@/services/clientService";
import { SaleType } from "@/services/salesService";
import { ProductSelection } from "./NewSaleDialog";
import { Separator } from "@/components/ui/separator";

interface SaleSummaryProps {
  client: Client;
  saleType: SaleType;
  selectedProducts: ProductSelection[];
  isCreating: boolean;
  onCreateSale: () => void;
}

const SaleSummary = ({ client, saleType, selectedProducts, isCreating, onCreateSale }: SaleSummaryProps) => {
  // In a real implementation you would calculate this from your database pricing
  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => {
      // This is a mock price calculation. In a real app, you'd use actual prices
      const basePrice = product.type === "complete" ? 30 : 10;
      return total + (basePrice * product.quantity);
    }, 0);
  };

  const getSaleTypeText = () => {
    switch (saleType) {
      case "complete":
        return "Cuentas Completas";
      case "profile":
        return "Pantallas / Perfiles";
      case "mixed":
        return "Mixta (Cuentas y Perfiles)";
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Resumen de la Venta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Cliente</p>
            <p className="font-medium">{client.name}</p>
            {client.email && <p className="text-sm">{client.email}</p>}
          </div>
          
          <Separator />
          
          <div>
            <p className="text-sm text-muted-foreground">Tipo de venta</p>
            <p className="font-medium">{getSaleTypeText()}</p>
          </div>
          
          <Separator />
          
          <div>
            <p className="text-sm text-muted-foreground">Productos</p>
            {selectedProducts.map((product, index) => (
              <div key={`${product.product.id}-${index}`} className="flex justify-between py-1">
                <span>
                  {product.product.name} ({product.type === "complete" ? "Cuenta" : "Perfil"})
                </span>
                <span className="font-medium">
                  {product.quantity} {product.quantity > 1 ? "unidades" : "unidad"}
                </span>
              </div>
            ))}
          </div>
          
          <Separator />
          
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">${calculateTotal().toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
      
      <div className="pt-4 flex justify-end">
        <Button onClick={onCreateSale} disabled={isCreating}>
          {isCreating ? "Creando venta..." : "Confirmar venta"}
        </Button>
      </div>
    </div>
  );
};

export default SaleSummary;
