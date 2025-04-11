
import { Button } from "@/components/ui/button";
import { SaleType } from "@/services/salesService";
import { Package, Monitor, Mix } from "lucide-react";

interface SaleTypeSelectionProps {
  onSaleTypeSelect: (type: SaleType) => void;
}

const SaleTypeSelection = ({ onSaleTypeSelect }: SaleTypeSelectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Button
        variant="outline"
        className="h-auto flex-col py-8 space-y-2"
        onClick={() => onSaleTypeSelect('complete')}
      >
        <Package className="h-12 w-12 mb-2" />
        <span className="text-lg font-medium">Cuentas Completas</span>
        <p className="font-normal text-center text-sm text-muted-foreground">
          Cuentas completas con acceso a todos los perfiles
        </p>
      </Button>
      
      <Button
        variant="outline"
        className="h-auto flex-col py-8 space-y-2"
        onClick={() => onSaleTypeSelect('profile')}
      >
        <Monitor className="h-12 w-12 mb-2" />
        <span className="text-lg font-medium">Pantallas</span>
        <p className="font-normal text-center text-sm text-muted-foreground">
          Perfiles individuales de diferentes cuentas
        </p>
      </Button>
      
      <Button
        variant="outline"
        className="h-auto flex-col py-8 space-y-2"
        onClick={() => onSaleTypeSelect('mixed')}
      >
        <div className="relative h-12 w-12 mb-2">
          <Package className="absolute h-8 w-8 left-0 top-0" />
          <Monitor className="absolute h-8 w-8 right-0 bottom-0" />
        </div>
        <span className="text-lg font-medium">Mixta</span>
        <p className="font-normal text-center text-sm text-muted-foreground">
          Combinación de cuentas completas y perfiles individuales
        </p>
      </Button>
    </div>
  );
};

export default SaleTypeSelection;
