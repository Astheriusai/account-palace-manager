
import { supabase } from "@/integrations/supabase/client";

export interface AccountProfile {
  id: string;
  name: string;
  assigned: boolean;
}

export interface Account {
  id: string;
  service: string;
  email: string;
  password: string;
  purchaseDate: string;
  expirationDate: string;
  status: 'available' | 'in-use' | 'expired';
  profiles: AccountProfile[];
  serviceId: string;
}

export async function getAccountsByProductId(productId: string): Promise<Account[]> {
  try {
    const { data: accounts, error } = await supabase
      .from('accounts')
      .select(`
        id,
        email,
        password,
        purchase_date,
        expiration_date,
        available,
        service_id
      `)
      .eq('service_id', productId);

    if (error) {
      console.error('Error fetching accounts by product ID:', error);
      throw error;
    }

    // Also fetch the product details
    const { data: service, error: serviceError } = await supabase
      .from('services')
      .select('name')
      .eq('id', productId)
      .single();

    if (serviceError) {
      console.error('Error fetching product details:', serviceError);
    }

    // Fetch profiles for each account
    const accountsWithProfiles = await Promise.all(accounts.map(async (account) => {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, profile_name, sale_id, in_use')
        .eq('account_id', account.id);
        
      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        return {
          id: account.id,
          service: service?.name || 'Unknown Service',
          email: account.email,
          password: account.password,
          purchaseDate: new Date(account.purchase_date).toLocaleDateString('es-ES'),
          expirationDate: account.expiration_date ? new Date(account.expiration_date).toLocaleDateString('es-ES') : 'N/A',
          status: getAccountStatus(account.available, account.expiration_date),
          profiles: [],
          serviceId: account.service_id
        };
      }

      return {
        id: account.id,
        service: service?.name || 'Unknown Service',
        email: account.email,
        password: account.password,
        purchaseDate: new Date(account.purchase_date).toLocaleDateString('es-ES'),
        expirationDate: account.expiration_date ? new Date(account.expiration_date).toLocaleDateString('es-ES') : 'N/A',
        status: getAccountStatus(account.available, account.expiration_date),
        profiles: profiles.map(profile => ({
          id: profile.id,
          name: profile.profile_name,
          assigned: profile.in_use || profile.sale_id !== null
        })),
        serviceId: account.service_id
      };
    }));

    return accountsWithProfiles;
  } catch (error) {
    console.error('Failed to fetch accounts by product ID:', error);
    throw error;
  }
}

function getAccountStatus(available: boolean | null, expirationDate: string | null): 'available' | 'in-use' | 'expired' {
  if (!available) return 'in-use';
  
  if (expirationDate) {
    const now = new Date();
    const expiration = new Date(expirationDate);
    if (expiration < now) return 'expired';
  }
  
  return 'available';
}
