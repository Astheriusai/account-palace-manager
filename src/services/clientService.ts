
import { supabase } from "@/integrations/supabase/client";

export interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
}

export async function getClients(): Promise<Client[]> {
  try {
    const { data: clients, error } = await supabase
      .from('clients')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching clients:', error);
      throw error;
    }

    return clients;
  } catch (error) {
    console.error('Failed to fetch clients:', error);
    throw error;
  }
}
