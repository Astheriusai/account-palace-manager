import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Settings,
  Package,
  Users,
  ShoppingCart,
  Key,
  User,
  Smartphone,
  Menu,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, isActive, isCollapsed }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-sidebar-accent",
        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground",
        isCollapsed && "justify-center px-2"
      )}
    >
      <Icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navigationItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Package, label: "Productos", href: "/products" },
    { icon: Users, label: "Clientes", href: "/clients" },
    { icon: ShoppingCart, label: "Ventas", href: "/sales" },
    { icon: Key, label: "Cuentas", href: "/accounts" },
    { icon: User, label: "Perfiles", href: "/profiles" },
    { icon: Smartphone, label: "App Móvil", href: "/mobile-app" },
    { icon: Settings, label: "Configuración", href: "/settings" }
  ];

  return (
    <div 
      className={cn(
        "flex flex-col h-screen border-r border-sidebar-border bg-sidebar-DEFAULT transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-sidebar-foreground">
            Account Palace
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto", collapsed && "mx-auto")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {navigationItems.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={location.pathname === item.href}
              isCollapsed={collapsed}
            />
          ))}
        </nav>
      </div>
      <div className="h-16 border-t border-sidebar-border p-2">
        <div className={cn(
          "flex items-center gap-3 rounded-md p-2",
          collapsed ? "justify-center" : "px-3"
        )}>
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <span className="text-sm font-semibold">AP</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">Admin User</span>
              <span className="text-xs text-sidebar-foreground/70">admin@example.com</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
