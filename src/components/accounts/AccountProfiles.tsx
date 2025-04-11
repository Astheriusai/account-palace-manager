
import React from "react";
import { UserCircle2 } from "lucide-react";

export interface Profile {
  id: number | string;
  name: string;
  assigned: boolean;
}

interface AccountProfilesProps {
  profiles: Profile[];
}

export const AccountProfiles = ({ profiles }: AccountProfilesProps) => {
  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {profiles.map((profile) => (
        <div key={profile.id} className={`p-3 rounded-md border text-center ${profile.assigned ? 'bg-muted/50' : 'bg-success/20'}`}>
          <UserCircle2 className={`h-8 w-8 mx-auto ${profile.assigned ? 'text-muted-foreground' : 'text-success'}`} />
          <div className="mt-2 text-sm font-medium">{profile.name}</div>
          <div className="text-xs text-muted-foreground">
            {profile.assigned ? 'Asignado' : 'Disponible'}
          </div>
        </div>
      ))}
    </div>
  );
};
