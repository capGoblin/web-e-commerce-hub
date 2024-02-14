import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_APP_URL;
const supabaseKey = process.env.NEXT_APP_ANON_KEY;
// const supabase = createClient(supabaseUrl!, supabaseKey!);
console.log(supabaseUrl);
console.log(supabaseKey);
export const supabase = createClient(
  "https://swkihtahvppxvpwsqmhh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3a2lodGFodnBweHZwd3NxbWhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc2NjUyNTIsImV4cCI6MjAyMzI0MTI1Mn0.ikDx_NVQRHGql_z-rVGqIQRAxMzhww4xihEEQFucBbM"
);
