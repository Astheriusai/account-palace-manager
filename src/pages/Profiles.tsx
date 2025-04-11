
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle2, Users } from "lucide-react";

export default function Profiles() {
  const services = [
    {
      name: "Netflix",
      profiles: [
        { id: 1, name: "Perfil N1", client: "Juan Pérez", email: "cuenta1@netflix.com", expiration: "15-07-2025" },
        { id: 2, name: "Perfil N2", client: "María López", email: "cuenta1@netflix.com", expiration: "10-06-2025" },
        { id: 3, name: "Perfil N3", client: null, email: "cuenta1@netflix.com", expiration: null },
        { id: 4, name: "Perfil N4", client: "Roberto Silva", email: "cuenta2@netflix.com", expiration: "05-05-2025" },
        { id: 5, name: "Perfil N5", client: "Ana Gómez", email: "cuenta2@netflix.com", expiration: "01-08-2025" },
      ]
    },
    {
      name: "Disney+",
      profiles: [
        { id: 1, name: "Perfil D1", client: "Carlos Ruiz", email: "cuenta1@disney.com", expiration: "15-10-2025" },
        { id: 2, name: "Perfil D2", client: "María López", email: "cuenta1@disney.com", expiration: "15-10-2025" },
        { id: 3, name: "Perfil D3", client: "Juan Pérez", email: "cuenta1@disney.com", expiration: "15-10-2025" },
        { id: 4, name: "Perfil D4", client: "Ana Gómez", email: "cuenta1@disney.com", expiration: "15-10-2025" },
        { id: 5, name: "Perfil D5", client: "Roberto Silva", email: "cuenta1@disney.com", expiration: "15-10-2025" },
        { id: 6, name: "Perfil D6", client: "Carlos Ruiz", email: "cuenta2@disney.com", expiration: "20-09-2025" },
        { id: 7, name: "Perfil D7", client: null, email: "cuenta2@disney.com", expiration: null },
      ]
    },
    {
      name: "HBO Max",
      profiles: [
        { id: 1, name: "Perfil H1", client: "Juan Pérez", email: "cuenta1@hbomax.com", expiration: "25-08-2025" },
        { id: 2, name: "Perfil H2", client: null, email: "cuenta1@hbomax.com", expiration: null },
        { id: 3, name: "Perfil H3", client: null, email: "cuenta1@hbomax.com", expiration: null },
        { id: 4, name: "Perfil H4", client: "María López", email: "cuenta2@hbomax.com", expiration: "10-11-2025" },
        { id: 5, name: "Perfil H5", client: "Roberto Silva", email: "cuenta2@hbomax.com", expiration: "10-11-2025" },
      ]
    }
  ];

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Perfiles</h1>
        <Button>Asignar Perfiles</Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todos los servicios</TabsTrigger>
          {services.map((service) => (
            <TabsTrigger key={service.name} value={service.name}>{service.name}</TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {services.map((service) => (
            <Card key={service.name}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  {service.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {service.profiles.map((profile) => (
                    <div key={profile.id} className={`p-4 rounded-md border ${profile.client ? 'bg-muted/50' : 'bg-success/20'}`}>
                      <div className="flex items-center gap-3">
                        <UserCircle2 className={`h-10 w-10 ${profile.client ? 'text-muted-foreground' : 'text-success'}`} />
                        <div>
                          <div className="font-medium">{profile.name}</div>
                          <div className="text-xs text-muted-foreground">{profile.email}</div>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t">
                        {profile.client ? (
                          <>
                            <div className="text-sm font-medium">Cliente: {profile.client}</div>
                            <div className="text-xs text-muted-foreground">Vence: {profile.expiration}</div>
                          </>
                        ) : (
                          <div className="text-sm font-medium text-success">Disponible</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        {services.map((service) => (
          <TabsContent key={service.name} value={service.name}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  {service.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {service.profiles.map((profile) => (
                    <div key={profile.id} className={`p-4 rounded-md border ${profile.client ? 'bg-muted/50' : 'bg-success/20'}`}>
                      <div className="flex items-center gap-3">
                        <UserCircle2 className={`h-10 w-10 ${profile.client ? 'text-muted-foreground' : 'text-success'}`} />
                        <div>
                          <div className="font-medium">{profile.name}</div>
                          <div className="text-xs text-muted-foreground">{profile.email}</div>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t">
                        {profile.client ? (
                          <>
                            <div className="text-sm font-medium">Cliente: {profile.client}</div>
                            <div className="text-xs text-muted-foreground">Vence: {profile.expiration}</div>
                          </>
                        ) : (
                          <div className="text-sm font-medium text-success">Disponible</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </PageLayout>
  );
}
