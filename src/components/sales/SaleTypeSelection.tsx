
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
    <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'sm:grid-cols-3 gap-4'} mx-auto w-full`}>
      <Button
        variant="outline"
        className={`h-auto flex flex-col ${isMobile ? 'py-3' : 'py-6'} px-2 items-center justify-center w-full`}
        onClick={() => onSaleTypeSelect('complete')}
      >
        <Package className={`${isMobile ? 'h-7 w-7 mb-1' : 'h-10 w-10 mb-2'}`} />
        <span className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-center`}>
          Cuentas Completas
        </span>
        <p className="font-normal text-center text-xs sm:text-sm text-muted-foreground mt-1 px-1 line-clamp-2">
          Cuentas completas con acceso a todos los perfiles
        </p>
      </Button>
      
      <Button
        variant="outline"
        className={`h-auto flex flex-col ${isMobile ? 'py-3' : 'py-6'} px-2 items-center justify-center w-full`}
        onClick={() => onSaleTypeSelect('profile')}
      >
        <Monitor className={`${isMobile ? 'h-7 w-7 mb-1' : 'h-10 w-10 mb-2'}`} />
        <span className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-center`}>
          Pantallas
        </span>
        <p className="font-normal text-center text-xs sm:text-sm text-muted-foreground mt-1 px-1 line-clamp-2">
          Perfiles individuales de diferentes cuentas
        </p>
      </Button>
      
      <Button
        variant="outline"
        className={`h-auto flex flex-col ${isMobile ? 'py-3' : 'py-6'} px-2 items-center justify-center w-full`}
        onClick={() => onSaleTypeSelect('mixed')}
      >
        <div className={`relative flex items-center justify-center ${isMobile ? 'h-7 w-7 mb-1' : 'h-10 w-10 mb-2'}`}>
          <Package className="absolute h-6 w-6 left-0 top-0" />
          <Monitor className="absolute h-6 w-6 right-0 bottom-0" />
        </div>
        <span className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-center`}>
          Mixta
        </span>
        <p className="font-normal text-center text-xs sm:text-sm text-muted-foreground mt-1 px-1 line-clamp-2">
          Combinación de cuentas completas y perfiles individuales
        </p>
      </Button>
    </div>
  );
};

export default SaleTypeSelection;
