
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@/components/ui/link";

export default function Settings() {
  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="zapier">Integraciones</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>
                Ajusta las preferencias generales del sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Moneda por defecto</Label>
                <Select defaultValue="usd">
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Selecciona una moneda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD (Dólares)</SelectItem>
                    <SelectItem value="eur">EUR (Euros)</SelectItem>
                    <SelectItem value="mxn">MXN (Pesos Mexicanos)</SelectItem>
                    <SelectItem value="cop">COP (Pesos Colombianos)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date-format">Formato de fecha</Label>
                <Select defaultValue="dd-mm-yyyy">
                  <SelectTrigger id="date-format">
                    <SelectValue placeholder="Selecciona un formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd-mm-yyyy">DD-MM-AAAA</SelectItem>
                    <SelectItem value="mm-dd-yyyy">MM-DD-AAAA</SelectItem>
                    <SelectItem value="yyyy-mm-dd">AAAA-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Zona horaria</Label>
                <Select defaultValue="america-mexico">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Selecciona una zona horaria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america-mexico">América/Ciudad de México</SelectItem>
                    <SelectItem value="america-bogota">América/Bogotá</SelectItem>
                    <SelectItem value="america-lima">América/Lima</SelectItem>
                    <SelectItem value="america-santiago">América/Santiago</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button>Guardar Cambios</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mensajes de WhatsApp</CardTitle>
              <CardDescription>
                Configura los mensajes que se envían automáticamente a tus clientes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sale-message">Mensaje de Venta Confirmada</Label>
                <Textarea
                  id="sale-message"
                  placeholder="Escribe el mensaje que se enviará al confirmar una venta"
                  defaultValue="¡Hola *nombre_cliente*! Gracias por tu compra. Hemos activado tu cuenta de *servicio* por *duracion*. El acceso es: Correo: *correo_cuenta* | Contraseña: *clave_cuenta* | Perfil: *perfil_asignado*. ¡Disfruta!"
                  className="min-h-[120px]"
                />
                <p className="text-sm text-muted-foreground">
                  Variables disponibles: <code>*nombre_cliente*</code>, <code>*servicio*</code>, <code>*duracion*</code>, <code>*correo_cuenta*</code>, <code>*clave_cuenta*</code>, <code>*perfil_asignado*</code>, <code>*fecha_vencimiento*</code>
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reminder-message">Mensaje de Recordatorio / Renovación</Label>
                <Textarea
                  id="reminder-message"
                  placeholder="Escribe el mensaje que se enviará como recordatorio"
                  defaultValue="¡Hola *nombre_cliente*! Tu suscripción de *servicio* está próxima a vencer el *fecha_vencimiento*. Para renovar, responde este mensaje o contáctanos al número de soporte. ¡Gracias por confiar en nosotros!"
                  className="min-h-[120px]"
                />
              </div>
              
              <Button>Guardar Mensajes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="zapier" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integraciones con Zapier</CardTitle>
              <CardDescription>
                Configura webhooks para automatizar mensajes y recordatorios.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-sale">Webhook para Ventas</Label>
                <Input
                  id="webhook-sale"
                  placeholder="URL del webhook de Zapier para ventas nuevas"
                  defaultValue="https://hooks.zapier.com/hooks/catch/123456/abcdef/"
                />
                <p className="text-sm text-muted-foreground">
                  Este webhook se activará automáticamente al registrar una nueva venta.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhook-reminder">Webhook para Recordatorios</Label>
                <Input
                  id="webhook-reminder"
                  placeholder="URL del webhook de Zapier para recordatorios"
                  defaultValue="https://hooks.zapier.com/hooks/catch/123456/ghijkl/"
                />
                <p className="text-sm text-muted-foreground">
                  Este webhook se puede activar manualmente desde cada venta para enviar recordatorios.
                </p>
              </div>
              
              <div className="pt-2">
                <Button>Guardar Configuración</Button>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <p className="text-sm">
                  ¿Necesitas ayuda para configurar Zapier? <Link href="#" className="text-primary hover:underline">Ver guía de configuración</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
