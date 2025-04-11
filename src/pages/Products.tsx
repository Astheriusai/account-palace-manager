
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus } from "lucide-react";

export default function Products() {
  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Netflix</CardTitle>
            <CardDescription>5 perfiles máximo por cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Package className="h-10 w-10 text-primary/80" />
                <div>
                  <p className="text-sm font-medium">Duración estándar:</p>
                  <p className="text-sm text-muted-foreground">1, 3, 6, 12 meses</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Gestionar</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Disney+</CardTitle>
            <CardDescription>7 perfiles máximo por cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Package className="h-10 w-10 text-primary/80" />
                <div>
                  <p className="text-sm font-medium">Duración estándar:</p>
                  <p className="text-sm text-muted-foreground">1, 3, 6, 12 meses</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Gestionar</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>HBO Max</CardTitle>
            <CardDescription>5 perfiles máximo por cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Package className="h-10 w-10 text-primary/80" />
                <div>
                  <p className="text-sm font-medium">Duración estándar:</p>
                  <p className="text-sm text-muted-foreground">1, 3, 6, 12 meses</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Gestionar</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
