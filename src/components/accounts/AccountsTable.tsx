
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Pencil, Trash2, UserCircle2 } from "lucide-react";
import { AccountStatusBadge } from "./AccountStatusBadge";
import { Account } from "@/types/account";

interface AccountsTableProps {
  accounts: Account[];
}

export const AccountsTable = ({ accounts }: AccountsTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Servicio</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contraseña</TableHead>
            <TableHead>Compra</TableHead>
            <TableHead>Vencimiento</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell>{account.id}</TableCell>
              <TableCell className="font-medium">{account.service}</TableCell>
              <TableCell>{account.email}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span>{account.password}</span>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{account.purchaseDate}</TableCell>
              <TableCell>{account.expirationDate}</TableCell>
              <TableCell><AccountStatusBadge status={account.status} /></TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2">
                      <Pencil className="h-4 w-4" /> Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <UserCircle2 className="h-4 w-4" /> Gestionar Perfiles
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-destructive">
                      <Trash2 className="h-4 w-4" /> Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
