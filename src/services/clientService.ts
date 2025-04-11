
import { supabase } from "@/integrations/supabase/client";

export interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
}

export interface CreateClientData {
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

export async function createClient(clientData: CreateClientData): Promise<Client> {
  try {
    const { data: client, error } = await supabase
      .from('clients')
      .insert([clientData])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating client:', error);
      throw error;
    }

    return client;
  } catch (error) {
    console.error('Failed to create client:', error);
    throw error;
  }
}
