
import { Profile } from "@/components/accounts/AccountProfiles";

export interface Account {
  id: number | string;
  service: string;
  email: string;
  password: string;
  purchaseDate: string;
  expirationDate: string;
  status: 'available' | 'in-use' | 'expired';
  profiles: Profile[];
}
