
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Client } from "@/services/clientService";
import { Product } from "@/services/productService";
import { SaleType } from "@/services/salesService";
import ClientSelection from "./ClientSelection";
import SaleTypeSelection from "./SaleTypeSelection";
import ProductSelection from "./ProductSelection";
import AccountSelection from "./AccountSelection";
import SaleSummary from "./SaleSummary";
import { toast } from "sonner";

export interface ProductSelection {
  product: Product;
  quantity: number;
  type: "complete" | "profile";
}

interface NewSaleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clients: Client[];
  products: Product[];
}

const NewSaleDialog = ({ open, onOpenChange, clients, products }: NewSaleDialogProps) => {
  const [step, setStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [saleType, setSaleType] = useState<SaleType | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<ProductSelection[]>([]);
  const [creatingOrder, setCreatingOrder] = useState(false);
  
  const resetDialog = () => {
    setStep(1);
    setSelectedClient(null);
    setSaleType(null);
    setSelectedProducts([]);
    setCreatingOrder(false);
  };

  const handleClose = () => {
    resetDialog();
    onOpenChange(false);
  };

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    setStep(2);
  };

  const handleSaleTypeSelect = (type: SaleType) => {
    setSaleType(type);
    setStep(3);
  };

  const handleProductSelect = (selection: ProductSelection[]) => {
    setSelectedProducts(selection);
    if (selection.length > 0) {
      setStep(4);
    } else {
      toast.error("Debes seleccionar al menos un producto");
    }
  };

  const handleBackClick = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCreateSale = () => {
    setCreatingOrder(true);
    // In a real scenario, we would call a service to create the sale
    setTimeout(() => {
      toast.success("Venta creada con éxito");
      handleClose();
    }, 1500);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <ClientSelection clients={clients} onClientSelect={handleClientSelect} />;
      case 2:
        return <SaleTypeSelection onSaleTypeSelect={handleSaleTypeSelect} />;
      case 3:
        return (
          <ProductSelection 
            products={products} 
            saleType={saleType!} 
            onProductsSelect={handleProductSelect}
          />
        );
      case 4:
        return (
          <AccountSelection 
            selectedProducts={selectedProducts}
            onNext={() => setStep(5)}
          />
        );
      case 5:
        return (
          <SaleSummary 
            client={selectedClient!}
            saleType={saleType!}
            selectedProducts={selectedProducts}
            onCreateSale={handleCreateSale}
            isCreating={creatingOrder}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nueva Venta</DialogTitle>
          <DialogDescription>
            {step === 1 && "Selecciona un cliente para esta venta"}
            {step === 2 && "Selecciona el tipo de venta"}
            {step === 3 && "Selecciona productos y cantidades"}
            {step === 4 && "Selecciona cuentas y perfiles específicos"}
            {step === 5 && "Revisa y confirma la venta"}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {renderStepContent()}
        </div>

        <div className="flex justify-between mt-4">
          {step > 1 && (
            <Button variant="outline" onClick={handleBackClick} disabled={creatingOrder}>
              Atrás
            </Button>
          )}
          {step === 1 && (
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewSaleDialog;
