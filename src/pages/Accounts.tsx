
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";
import { AccountsTable } from "@/components/accounts/AccountsTable";
import { AccountCards } from "@/components/accounts/AccountCards";
import { Account } from "@/types/account";

export default function Accounts() {
  const accounts: Account[] = [
    { 
      id: 1, 
      service: "Netflix", 
      email: "cuenta1@netflix.com", 
      password: "●●●●●●●●", 
      purchaseDate: "15-01-2025", 
      expirationDate: "15-01-2026", 
      status: "available",
      profiles: [
        { id: 1, name: "Perfil 1", assigned: false },
        { id: 2, name: "Perfil 2", assigned: false },
        { id: 3, name: "Perfil 3", assigned: false },
        { id: 4, name: "Perfil 4", assigned: true },
        { id: 5, name: "Perfil 5", assigned: true },
      ]
    },
    { 
      id: 2, 
      service: "Disney+", 
      email: "cuenta1@disney.com", 
      password: "●●●●●●●●", 
      purchaseDate: "10-01-2025", 
      expirationDate: "10-01-2026", 
      status: "in-use",
      profiles: [
        { id: 1, name: "Perfil 1", assigned: true },
        { id: 2, name: "Perfil 2", assigned: true },
        { id: 3, name: "Perfil 3", assigned: true },
        { id: 4, name: "Perfil 4", assigned: true },
        { id: 5, name: "Perfil 5", assigned: true },
        { id: 6, name: "Perfil 6", assigned: true },
        { id: 7, name: "Perfil 7", assigned: true },
      ]
    },
    { 
      id: 3, 
      service: "HBO Max", 
      email: "cuenta1@hbomax.com", 
      password: "●●●●●●●●", 
      purchaseDate: "05-02-2025", 
      expirationDate: "05-02-2026", 
      status: "in-use",
      profiles: [
        { id: 1, name: "Perfil 1", assigned: true },
        { id: 2, name: "Perfil 2", assigned: false },
        { id: 3, name: "Perfil 3", assigned: false },
        { id: 4, name: "Perfil 4", assigned: true },
        { id: 5, name: "Perfil 5", assigned: false },
      ]
    },
  ];

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Cuentas</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Cuenta
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="available">Disponibles</TabsTrigger>
          <TabsTrigger value="in-use">En Uso</TabsTrigger>
          <TabsTrigger value="expired">Vencidas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
            <div className="relative flex-1 w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar cuenta..."
                className="pl-8"
              />
            </div>
          </div>

          <AccountsTable accounts={accounts} />
          <AccountCards accounts={accounts} />
        </TabsContent>
        
        <TabsContent value="available">
          <div className="h-40 flex items-center justify-center bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">Filtro de cuentas disponibles</p>
          </div>
        </TabsContent>

        <TabsContent value="in-use">
          <div className="h-40 flex items-center justify-center bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">Filtro de cuentas en uso</p>
          </div>
        </TabsContent>

        <TabsContent value="expired">
          <div className="h-40 flex items-center justify-center bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">Filtro de cuentas vencidas</p>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
