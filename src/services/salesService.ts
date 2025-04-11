
import { supabase } from "@/integrations/supabase/client";
import { Client } from "./clientService";

export interface Sale {
  id: string;
  client_id: string | null;
  client_name?: string;
  service_id: string;
  service_name?: string;
  account_id: string;
  price: number;
  duration: string;
  start_date: string;
  expiration_date: string;
  created_at: string;
}

export type SaleType = 'complete' | 'profile' | 'mixed';

export async function getSales(): Promise<Sale[]> {
  try {
    const { data: sales, error } = await supabase
      .from('sales')
      .select(`
        *,
        clients:client_id (name),
        services:service_id (name)
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching sales:', error);
      throw error;
    }

    return sales.map(sale => ({
      id: sale.id,
      client_id: sale.client_id,
      client_name: sale.clients?.name || 'Cliente no asignado',
      service_id: sale.service_id,
      service_name: sale.services?.name || 'Servicio desconocido',
      account_id: sale.account_id,
      price: sale.price,
      duration: sale.duration,
      start_date: new Date(sale.start_date).toLocaleDateString('es-ES'),
      expiration_date: new Date(sale.expiration_date).toLocaleDateString('es-ES'),
      created_at: new Date(sale.created_at).toLocaleDateString('es-ES'),
    }));
  } catch (error) {
    console.error('Failed to fetch sales:', error);
    throw error;
  }
}

export async function createSale(newSale: Omit<Sale, 'id' | 'created_at'>): Promise<Sale> {
  try {
    const { data, error } = await supabase
      .from('sales')
      .insert([{
        client_id: newSale.client_id,
        service_id: newSale.service_id,
        account_id: newSale.account_id,
        price: newSale.price,
        duration: newSale.duration,
        start_date: newSale.start_date,
        expiration_date: newSale.expiration_date
      }])
      .select(`
        *,
        clients:client_id (name),
        services:service_id (name)
      `)
      .single();
    
    if (error) {
      console.error('Error creating sale:', error);
      throw error;
    }

    return {
      id: data.id,
      client_id: data.client_id,
      client_name: data.clients?.name || 'Cliente no asignado',
      service_id: data.service_id,
      service_name: data.services?.name || 'Servicio desconocido',
      account_id: data.account_id,
      price: data.price,
      duration: data.duration,
      start_date: new Date(data.start_date).toLocaleDateString('es-ES'),
      expiration_date: new Date(data.expiration_date).toLocaleDateString('es-ES'),
      created_at: new Date(data.created_at).toLocaleDateString('es-ES'),
    };
  } catch (error) {
    console.error('Failed to create sale:', error);
    throw error;
  }
}
