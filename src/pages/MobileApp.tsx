
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, QrCode, UsersRound, User, Shield } from "lucide-react";

export default function MobileApp() {
  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">App Móvil</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-primary" />
              <CardTitle>App para Clientes</CardTitle>
            </div>
            <CardDescription>
              Configuración de la aplicación móvil para tus clientes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="client-app-active" defaultChecked />
              <Label htmlFor="client-app-active">Activar acceso de clientes</Label>
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="app-name">Nombre personalizado</Label>
              <Input id="app-name" placeholder="Nombre de tu app de clientes" defaultValue="Account Palace" />
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="app-welcome">Mensaje de bienvenida</Label>
              <Input id="app-welcome" placeholder="Mensaje de bienvenida para clientes" defaultValue="¡Bienvenido a tu portal de cuentas!" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Clientes conectados</span>
              <span className="text-2xl font-bold">24</span>
            </div>
            <Button className="gap-2">
              <QrCode className="h-4 w-4" />
              Generar QR de acceso
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <UsersRound className="h-5 w-5 text-primary" />
              <CardTitle>App para Vendedores</CardTitle>
            </div>
            <CardDescription>
              Configuración de la aplicación móvil para tu equipo de ventas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="vendor-app-active" />
              <Label htmlFor="vendor-app-active">Activar acceso de vendedores</Label>
            </div>
            
            <Tabs defaultValue="permissions">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="permissions">Permisos</TabsTrigger>
                <TabsTrigger value="access">Accesos</TabsTrigger>
              </TabsList>
              <TabsContent value="permissions" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="perm-create-sales" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="perm-create-sales">Crear ventas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="perm-manage-clients" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="perm-manage-clients">Gestionar clientes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="perm-view-accounts" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="perm-view-accounts">Ver cuentas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="perm-edit-accounts" className="rounded border-gray-300" />
                    <Label htmlFor="perm-edit-accounts">Editar cuentas</Label>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="access" className="pt-4">
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="access-users">Usuarios con acceso</Label>
                    <Input id="access-users" placeholder="Emails separados por comas" />
                  </div>
                  <Button variant="outline" className="w-full gap-2">
                    <User className="h-4 w-4" />
                    Añadir usuario
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button className="w-full gap-2">
              <Shield className="h-4 w-4" />
              Guardar Configuración
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Estado de la API</CardTitle>
            <CardDescription>Información sobre la conexión API para las aplicaciones móviles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Estado de la API</span>
                <span className="status-active">Activa</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Clave API</span>
                <code className="bg-muted px-2 py-1 rounded">••••••••••••••••••••••</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Último reinicio</span>
                <span>10-04-2025 08:45 AM</span>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline">Regenerar Clave API</Button>
                <Button variant="outline">Reiniciar API</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
