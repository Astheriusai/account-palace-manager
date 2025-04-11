
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  maxProfiles: number;
  durations: string[];
}

export async function getProducts(): Promise<Product[]> {
  try {
    const { data: services, error } = await supabase
      .from('services')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

    return services.map(service => ({
      id: service.id,
      name: service.name,
      maxProfiles: service.max_profiles,
      durations: ['1 mes', '3 meses', '6 meses', '12 meses'] // Default durations for now
    }));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching product:', error);
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      maxProfiles: data.max_profiles,
      durations: ['1 mes', '3 meses', '6 meses', '12 meses'] // Default durations for now
    };
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}
