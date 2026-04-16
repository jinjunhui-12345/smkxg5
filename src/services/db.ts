import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

function getSupabase() {
  if (!supabaseClient) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn('Supabase environment variables are missing. Database features will be disabled.');
      return null;
    }
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  }
  return supabaseClient;
}

export interface ReservationData {
  id?: string;
  name: string;
  identity: string;
  phone: string;
  visit_date: string;
  visit_time: string;
  remarks: string;
  created_at?: number;
}

export const dbService = {
  async saveReservation(data: Omit<ReservationData, 'id' | 'created_at'>): Promise<ReservationData> {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Database not configured');

    const newRecord: ReservationData = {
      ...data,
      id: Math.random().toString(36).substring(2, 10).toUpperCase(),
      created_at: Date.now(),
    };

    const { data: savedData, error } = await supabase
      .from('ReservationData')
      .insert([newRecord])
      .select()
      .single();

    if (error) throw error;
    return savedData;
  },

  async getReservations(): Promise<ReservationData[]> {
    const supabase = getSupabase();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('ReservationData')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateReservation(id: string, data: Partial<ReservationData>): Promise<ReservationData> {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Database not configured');

    const { data: updatedData, error } = await supabase
      .from('ReservationData')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return updatedData;
  },

  async deleteReservation(id: string): Promise<void> {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Database not configured');

    const { error } = await supabase
      .from('ReservationData')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async cleanupExpiredReservations(): Promise<number> {
    const supabase = getSupabase();
    if (!supabase) return 0;

    // Get yesterday's date in YYYY-MM-DD format
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateString = yesterday.toISOString().split('T')[0];

    const { data, error, count } = await supabase
      .from('ReservationData')
      .delete({ count: 'exact' })
      .lt('visit_date', dateString);

    if (error) {
      console.error('Failed to cleanup expired reservations:', error);
      return 0;
    }
    return count || 0;
  }
};
