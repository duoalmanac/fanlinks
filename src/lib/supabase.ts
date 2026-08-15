import { createClient } from '@supabase/supabase-js';

// URL e anon key são PÚBLICAS por design (as mesmas viajam no bundle
// do Almanac Center). O que protege a escrita é a RLS: anon só lê o
// que está ativo e fora da lixeira. Env vars da Vercel podem
// sobrescrever sem mexer no código.
export const SUPABASE_URL =
  import.meta.env.PUBLIC_SUPABASE_URL ?? 'https://stjqxfciwwhhujhiloiv.supabase.co';

const SUPABASE_ANON_KEY =
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0anF4ZmNpd3doaHVqaGlsb2l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2NDU3NTksImV4cCI6MjA5OTIyMTc1OX0.3v7rOix7_1XmOPC2qs7Hkh0B5IAhHWs8p0iRLmB26UI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
