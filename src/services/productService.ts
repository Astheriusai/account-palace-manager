
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  maxProfiles: number;
  durations: string[];
  active: boolean; // Added active property
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
      durations: ['1 mes', '3 meses', '6 meses', '12 meses'], // Default durations for now
      active: service.active || false
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
      durations: ['1 mes', '3 meses', '6 meses', '12 meses'], // Default durations for now
      active: data.active || false
    };
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

// Add the missing updateProduct function
export async function updateProduct(product: Product): Promise<void> {
  try {
    const { error } = await supabase
      .from('services')
      .update({
        name: product.name,
        max_profiles: product.maxProfiles,
        active: product.active
      })
      .eq('id', product.id);
    
    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to update product:', error);
    throw error;
  }
}
