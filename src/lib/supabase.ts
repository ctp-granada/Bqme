import { createClient } from '@supabase/supabase-js';

// Supabase credentials for the clinical laboratory learning applet
export const SUPABASE_URL = 'https://anexoemlahakvlmqkrwh.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuZXhvZW1sYWhha3ZsbXFrcndoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4ODk2NTksImV4cCI6MjEwMjQ2NTY1OX0.zeGfnl-AUY7I_XicLm8VVNmppWZD3y-5n0z-5D6a8Ks';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
