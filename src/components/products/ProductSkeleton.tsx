
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ProductSkeleton() {
  return (
    <Card className="opacity-60 animate-pulse">
      <CardHeader className="pb-3">
        <div className="h-7 bg-muted rounded mb-2 w-1/2"></div>
        <div className="h-5 bg-muted rounded w-3/4"></div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-muted"></div>
            <div>
              <div className="h-4 bg-muted rounded w-20 mb-2"></div>
              <div className="h-4 bg-muted rounded w-32"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
