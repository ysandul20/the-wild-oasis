import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://reisybnxlrxzfcsdkusy.supabase.co";
const supabaseKey =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlaXN5Ym54bHJ4emZjc2RrdXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MTMxMDQsImV4cCI6MjA1NjA4OTEwNH0.QjwZv6g6TO-AnQ1jMxtYGhuaerqFld08alBwUUI7e-w";
const supabase = createClient(supabaseUrl, supabaseKey);
export { supabaseUrl };
export default supabase;
