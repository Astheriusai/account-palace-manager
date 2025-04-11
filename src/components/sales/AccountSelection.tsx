
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductSelection } from "./NewSaleDialog";
import { Account } from "@/types/account";

interface AccountSelectionProps {
  selectedProducts: ProductSelection[];
  onNext: () => void;
}

// Mock data - this would come from your Supabase queries in a real implementation
const mockAccounts: Record<string, Account[]> = {
  "1": [
    { 
      id: "a1", 
      service: "Netflix", 
      email: "netflix1@example.com", 
      password: "password123", 
      purchaseDate: "2025-03-01", 
      expirationDate: "2026-03-01", 
      status: "available",
      profiles: [
        { id: "p1", name: "Profile 1", assigned: false },
        { id: "p2", name: "Profile 2", assigned: false },
        { id: "p3", name: "Profile 3", assigned: false },
        { id: "p4", name: "Profile 4", assigned: false }
      ]
    },
    { 
      id: "a2", 
      service: "Netflix", 
      email: "netflix2@example.com", 
      password: "password456", 
      purchaseDate: "2025-02-15", 
      expirationDate: "2025-08-15", 
      status: "available",
      profiles: [
        { id: "p5", name: "Profile 1", assigned: false },
        { id: "p6", name: "Profile 2", assigned: false },
        { id: "p7", name: "Profile 3", assigned: true },
        { id: "p8", name: "Profile 4", assigned: false }
      ]
    }
  ],
  "2": [
    { 
      id: "a3", 
      service: "Disney+", 
      email: "disney1@example.com", 
      password: "disneypass", 
      purchaseDate: "2025-01-20", 
      expirationDate: "2025-07-20", 
      status: "available",
      profiles: [
        { id: "p9", name: "Profile 1", assigned: false },
        { id: "p10", name: "Profile 2", assigned: false },
        { id: "p11", name: "Profile 3", assigned: false },
        { id: "p12", name: "Profile 4", assigned: false }
      ]
    }
  ]
};

interface Selection {
  productId: string;
  accountId: string | null;
  profileId?: string | null;
  type: "complete" | "profile";
}

const AccountSelection = ({ selectedProducts, onNext }: AccountSelectionProps) => {
  const [selections, setSelections] = useState<Selection[]>([]);
  
  const handleAccountSelect = (
    productId: string, 
    index: number, 
    accountId: string,
    type: "complete" | "profile"
  ) => {
    setSelections(prev => {
      const selectionKey = `${productId}-${index}-${type}`;
      const existingIndex = prev.findIndex(s => 
        s.productId === productId && 
        s.type === type && 
        `${s.productId}-${index}-${s.type}` === selectionKey
      );
      
      if (existingIndex >= 0) {
        const newSelections = [...prev];
        newSelections[existingIndex] = { 
          ...newSelections[existingIndex], 
          accountId 
        };
        return newSelections;
      } else {
        return [...prev, { productId, accountId, type }];
      }
    });
  };

  const handleProfileSelect = (
    productId: string, 
    accountId: string,
    index: number, 
    profileId: string
  ) => {
    setSelections(prev => {
      const selectionKey = `${productId}-${index}-profile`;
      const existingIndex = prev.findIndex(s => 
        s.productId === productId && 
        s.type === "profile" && 
        `${s.productId}-${index}-${s.type}` === selectionKey
      );
      
      if (existingIndex >= 0) {
        const newSelections = [...prev];
        newSelections[existingIndex] = { 
          ...newSelections[existingIndex], 
          profileId 
        };
        return newSelections;
      } else {
        return [...prev, { productId, accountId, profileId, type: "profile" }];
      }
    });
  };

  const getAccountsForProduct = (productId: string): Account[] => {
    return mockAccounts[productId] || [];
  };

  const getAvailableAccounts = (productId: string, type: "complete" | "profile"): Account[] => {
    const accounts = getAccountsForProduct(productId);
    
    if (type === "complete") {
      // For complete accounts, all profiles must be available
      return accounts.filter(account => 
        account.profiles.every(profile => !profile.assigned)
      );
    } else {
      // For profiles, at least one profile must be available
      return accounts.filter(account => 
        account.profiles.some(profile => !profile.assigned)
      );
    }
  };

  const getSelectedAccount = (productId: string, index: number, type: "complete" | "profile"): Account | undefined => {
    const selectionKey = `${productId}-${index}-${type}`;
    const selection = selections.find(s => 
      s.productId === productId && 
      s.type === type && 
      `${s.productId}-${index}-${s.type}` === selectionKey
    );
    
    if (selection?.accountId) {
      const accounts = getAccountsForProduct(productId);
      return accounts.find(a => a.id === selection.accountId);
    }
    return undefined;
  };

  const getSelectedProfile = (productId: string, index: number): string | undefined => {
    const selectionKey = `${productId}-${index}-profile`;
    const selection = selections.find(s => 
      s.productId === productId && 
      s.type === "profile" && 
      `${s.productId}-${index}-${s.type}` === selectionKey
    );
    
    return selection?.profileId;
  };

  // Check if all selections are made
  const allSelectionsComplete = selectedProducts.every((productItem, productIndex) => {
    for (let i = 0; i < productItem.quantity; i++) {
      const selectionKey = `${productItem.product.id}-${i}-${productItem.type}`;
      const selection = selections.find(s => 
        s.productId === productItem.product.id && 
        s.type === productItem.type && 
        `${s.productId}-${i}-${s.type}` === selectionKey
      );
      
      if (!selection || !selection.accountId) {
        return false;
      }
      
      if (productItem.type === "profile" && !selection.profileId) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
      {selectedProducts.map((productItem) => {
        const productSelections = Array(productItem.quantity).fill(null);
        
        return (
          <Card key={`${productItem.product.id}-${productItem.type}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {productItem.product.name} - {productItem.type === "complete" ? "Cuenta Completa" : "Perfiles"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {productSelections.map((_, index) => (
                <div key={`${productItem.product.id}-${productItem.type}-${index}`} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">#{index + 1}</span>
                    <Select 
                      onValueChange={(value) => handleAccountSelect(productItem.product.id, index, value, productItem.type)}
                      value={getSelectedAccount(productItem.product.id, index, productItem.type)?.id || ""}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Seleccionar cuenta" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableAccounts(productItem.product.id, productItem.type).map(account => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {productItem.type === "profile" && getSelectedAccount(productItem.product.id, index, productItem.type) && (
                    <div className="flex items-center gap-2 ml-6">
                      <Select
                        onValueChange={(value) => {
                          const account = getSelectedAccount(productItem.product.id, index, productItem.type);
                          if (account) {
                            handleProfileSelect(productItem.product.id, account.id, index, value);
                          }
                        }}
                        value={getSelectedProfile(productItem.product.id, index) || ""}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Seleccionar perfil" />
                        </SelectTrigger>
                        <SelectContent>
                          {getSelectedAccount(productItem.product.id, index, "profile")?.profiles
                            .filter(profile => !profile.assigned)
                            .map(profile => (
                              <SelectItem key={profile.id} value={profile.id}>
                                {profile.name}
                              </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}
      
      <div className="pt-4 flex justify-end">
        <Button onClick={onNext} disabled={!allSelectionsComplete}>
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default AccountSelection;
