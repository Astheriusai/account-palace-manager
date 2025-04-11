
import React from "react";

type AccountStatus = "available" | "in-use" | "expired";

interface AccountStatusBadgeProps {
  status: AccountStatus;
}

export const AccountStatusBadge = ({ status }: AccountStatusBadgeProps) => {
  switch (status) {
    case "available":
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Disponible</span>;
    case "in-use":
      return <span className="status-badge bg-info/20 text-info">En Uso</span>;
    case "expired":
      return <span className="status-inactive">Vencida</span>;
    default:
      return null;
  }
};
