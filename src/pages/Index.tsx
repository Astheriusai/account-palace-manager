
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLayout } from "@/components/layout/PageLayout";
import { 
  Users, 
  ShoppingCart, 
  Package, 
  Key,
  BarChart4,
  TrendingUp,
  AlertCircle
} from "lucide-react";

const DashboardCard = ({ title, value, icon: Icon, trend, description }: { 
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: { value: string; increasing: boolean };
  description?: string;
}) => {
  return (
    <Card className="card-dashboard">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {trend.increasing ? (
              <TrendingUp className="h-3 w-3 mr-1 text-success" />
            ) : (
              <TrendingUp className="h-3 w-3 mr-1 text-destructive rotate-180" />
            )}
            <span className={trend.increasing ? "text-success" : "text-destructive"}>
              {trend.value}
            </span>
            <span className="text-muted-foreground ml-1">vs. mes anterior</span>
          </p>
        )}
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
};

const ExpiringSoonCard = () => {
  const expiringItems = [
    { client: "Juan Pérez", service: "Disney+", date: "15-04-2025" },
    { client: "Ana Gómez", service: "Netflix", date: "18-04-2025" },
    { client: "Carlos Ruiz", service: "HBO Max", date: "20-04-2025" }
  ];

  return (
    <Card className="col-span-full md:col-span-2 card-dashboard">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Próximos a Vencer</CardTitle>
        <AlertCircle className="h-5 w-5 text-warning" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expiringItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between border-b pb-2 last:border-0">
              <div>
                <p className="font-medium">{item.client}</p>
                <p className="text-sm text-muted-foreground">{item.service}</p>
              </div>
              <div className="text-sm font-medium text-warning">{item.date}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function Index() {
  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Última actualización: {new Date().toLocaleDateString()}
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6 animate-fade-in">
        <DashboardCard
          title="Clientes Activos"
          value="128"
          icon={Users}
          trend={{ value: "12%", increasing: true }}
        />
        <DashboardCard
          title="Ventas del Mes"
          value="$5,240"
          icon={ShoppingCart}
          trend={{ value: "5%", increasing: true }}
        />
        <DashboardCard
          title="Servicios Activos"
          value="8"
          icon={Package}
          description="De 10 servicios totales"
        />
        <DashboardCard
          title="Cuentas Disponibles"
          value="54"
          icon={Key}
          description="75% de disponibilidad"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6 animate-fade-in">
        <Card className="lg:col-span-2 card-dashboard">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Ventas por Servicio</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[200px] flex items-center justify-center">
              <BarChart4 className="h-16 w-16 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground ml-2">Gráfico de ventas por servicio</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-dashboard">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Servicios Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Netflix</span>
                    <span className="text-sm">42%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-2 bg-primary rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Disney+</span>
                    <span className="text-sm">28%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-2 bg-primary rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">HBO Max</span>
                    <span className="text-sm">18%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-2 bg-primary rounded-full" style={{ width: '18%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 animate-fade-in">
        <ExpiringSoonCard />
        <Card className="card-dashboard">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Disponibilidad de Perfiles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Netflix</span>
                  <span className="text-sm">14/25 perfiles</span>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div className="h-2 bg-success rounded-full" style={{ width: '56%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Disney+</span>
                  <span className="text-sm">18/21 perfiles</span>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div className="h-2 bg-warning rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">HBO Max</span>
                  <span className="text-sm">8/15 perfiles</span>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div className="h-2 bg-success rounded-full" style={{ width: '53%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
