
import { Button } from "@/components/ui/button";
import { SaleType } from "@/services/salesService";
import { Package, Monitor, Layers } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SaleTypeSelectionProps {
  onSaleTypeSelect: (type: SaleType) => void;
}

const SaleTypeSelection = ({ onSaleTypeSelect }: SaleTypeSelectionProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'md:grid-cols-3 gap-4'}`}>
      <Button
        variant="outline"
        className={`h-auto flex-col ${isMobile ? 'py-4' : 'py-8'} space-y-2`}
        onClick={() => onSaleTypeSelect('complete')}
      >
        <Package className={`${isMobile ? 'h-8 w-8 mb-1' : 'h-12 w-12 mb-2'}`} />
        <span className={`${isMobile ? 'text-base' : 'text-lg'} font-medium`}>Cuentas Completas</span>
        <p className="font-normal text-center text-xs sm:text-sm text-muted-foreground px-1 sm:px-2">
          Cuentas completas con acceso a todos los perfiles
        </p>
      </Button>
      
      <Button
        variant="outline"
        className={`h-auto flex-col ${isMobile ? 'py-4' : 'py-8'} space-y-2`}
        onClick={() => onSaleTypeSelect('profile')}
      >
        <Monitor className={`${isMobile ? 'h-8 w-8 mb-1' : 'h-12 w-12 mb-2'}`} />
        <span className={`${isMobile ? 'text-base' : 'text-lg'} font-medium`}>Pantallas</span>
        <p className="font-normal text-center text-xs sm:text-sm text-muted-foreground px-1 sm:px-2">
          Perfiles individuales de diferentes cuentas
        </p>
      </Button>
      
      <Button
        variant="outline"
        className={`h-auto flex-col ${isMobile ? 'py-4' : 'py-8'} space-y-2`}
        onClick={() => onSaleTypeSelect('mixed')}
      >
        <div className={`relative ${isMobile ? 'h-8 w-8 mb-1' : 'h-12 w-12 mb-2'}`}>
          <Package className="absolute h-8 w-8 left-0 top-0" />
          <Monitor className="absolute h-8 w-8 right-0 bottom-0" />
        </div>
        <span className={`${isMobile ? 'text-base' : 'text-lg'} font-medium`}>Mixta</span>
        <p className="font-normal text-center text-xs sm:text-sm text-muted-foreground px-1 sm:px-2">
          Combinación de cuentas completas y perfiles individuales
        </p>
      </Button>
    </div>
  );
};

export default SaleTypeSelection;
