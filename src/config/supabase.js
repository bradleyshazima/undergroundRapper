import { createClient } from '@supabase/supabase-js';

// Notice we use import.meta.env for Vite instead of process.env or dotenv
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);