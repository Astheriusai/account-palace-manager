
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AccountStatusBadge } from "./AccountStatusBadge";
import { AccountProfiles } from "./AccountProfiles";
import { Account } from "@/types/account";

interface AccountCardsProps {
  accounts: Account[];
}

export const AccountCards = ({ accounts }: AccountCardsProps) => {
  return (
    <div className="mt-6 space-y-4">
      {accounts.map((account) => (
        <Card key={account.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{account.service} - {account.email}</div>
                  <div className="text-sm text-muted-foreground">Vence: {account.expirationDate}</div>
                </div>
                <div><AccountStatusBadge status={account.status} /></div>
              </div>
            </div>
            <AccountProfiles profiles={account.profiles} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
