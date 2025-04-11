
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/services/productService";
import { SaleType } from "@/services/salesService";
import { ProductSelection as ProductSelectionType } from "./NewSaleDialog";
import { Minus, Plus } from "lucide-react";

interface ProductSelectionProps {
  products: Product[];
  saleType: SaleType;
  onProductsSelect: (products: ProductSelectionType[]) => void;
}

const ProductSelection = ({ products, saleType, onProductsSelect }: ProductSelectionProps) => {
  const [selectedCompleteProducts, setSelectedCompleteProducts] = useState<ProductSelectionType[]>([]);
  const [selectedProfileProducts, setSelectedProfileProducts] = useState<ProductSelectionType[]>([]);
  
  // Filter for active products only
  const activeProducts = products.filter(product => product.active);

  const handleQuantityChange = (
    product: Product, 
    type: "complete" | "profile", 
    increment: boolean
  ) => {
    if (type === "complete") {
      setSelectedCompleteProducts(prev => {
        const existingIndex = prev.findIndex(p => p.product.id === product.id);
        if (existingIndex >= 0) {
          const newQuantity = increment 
            ? prev[existingIndex].quantity + 1 
            : Math.max(0, prev[existingIndex].quantity - 1);
          
          if (newQuantity === 0) {
            return prev.filter(p => p.product.id !== product.id);
          } else {
            const newArray = [...prev];
            newArray[existingIndex] = { ...newArray[existingIndex], quantity: newQuantity };
            return newArray;
          }
        } else if (increment) {
          return [...prev, { product, quantity: 1, type: "complete" }];
        }
        return prev;
      });
    } else {
      setSelectedProfileProducts(prev => {
        const existingIndex = prev.findIndex(p => p.product.id === product.id);
        if (existingIndex >= 0) {
          const newQuantity = increment 
            ? prev[existingIndex].quantity + 1 
            : Math.max(0, prev[existingIndex].quantity - 1);
          
          if (newQuantity === 0) {
            return prev.filter(p => p.product.id !== product.id);
          } else {
            const newArray = [...prev];
            newArray[existingIndex] = { ...newArray[existingIndex], quantity: newQuantity };
            return newArray;
          }
        } else if (increment) {
          return [...prev, { product, quantity: 1, type: "profile" }];
        }
        return prev;
      });
    }
  };

  const getQuantity = (productId: string, type: "complete" | "profile") => {
    const array = type === "complete" ? selectedCompleteProducts : selectedProfileProducts;
    const found = array.find(p => p.product.id === productId);
    return found ? found.quantity : 0;
  };

  const handleContinue = () => {
    let selectedProducts: ProductSelectionType[] = [];
    
    if (saleType === 'complete') {
      selectedProducts = selectedCompleteProducts;
    } else if (saleType === 'profile') {
      selectedProducts = selectedProfileProducts;
    } else {
      selectedProducts = [...selectedCompleteProducts, ...selectedProfileProducts];
    }

    onProductsSelect(selectedProducts);
  };

  const renderProductList = (type: "complete" | "profile") => (
    <div className="space-y-2">
      {activeProducts.map(product => (
        <Card key={`${product.id}-${type}`} className="overflow-hidden">
          <CardContent className="p-3 flex items-center justify-between">
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-muted-foreground">
                {type === "complete" ? "Cuenta completa" : `Máximo ${product.maxProfiles} perfiles`}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                disabled={getQuantity(product.id, type) === 0}
                onClick={() => handleQuantityChange(product, type, false)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">
                {getQuantity(product.id, type)}
              </span>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleQuantityChange(product, type, true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const totalSelected = 
    selectedCompleteProducts.reduce((sum, p) => sum + p.quantity, 0) + 
    selectedProfileProducts.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <div className="space-y-4">
      {saleType === 'mixed' && (
        <>
          <h3 className="text-lg font-medium">Cuentas Completas</h3>
          {renderProductList('complete')}
          
          <Separator className="my-4" />
          
          <h3 className="text-lg font-medium">Pantallas / Perfiles</h3>
          {renderProductList('profile')}
        </>
      )}
      
      {saleType === 'complete' && (
        <>
          <h3 className="text-lg font-medium">Cuentas Completas</h3>
          {renderProductList('complete')}
        </>
      )}
      
      {saleType === 'profile' && (
        <>
          <h3 className="text-lg font-medium">Pantallas / Perfiles</h3>
          {renderProductList('profile')}
        </>
      )}

      <div className="pt-4 flex justify-between items-center">
        <p className="text-sm">Total seleccionado: <span className="font-bold">{totalSelected}</span></p>
        <Button onClick={handleContinue} disabled={totalSelected === 0}>
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default ProductSelection;
