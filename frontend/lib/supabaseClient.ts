import { createClient } from "@supabase/supabase-js";
require("dotenv").config();

const supabaseUrl = process.env.NEXT_APP_URL!;
const supabaseKey = process.env.NEXT_APP_ANON_KEY!;
// const supabase = createClient(supabaseUrl!, supabaseKey!);
console.log(supabaseUrl);
console.log(supabaseKey);
export const supabase = createClient(supabaseUrl, supabaseKey);
