import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types";

export const createSupabaseClient = (
  supabaseUrl?: string,
  supabaseKey?: string,
): SupabaseClient<Database> => {
  const url =
    supabaseUrl ||
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    supabaseKey ||
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase URL or API key");
  }

  return createClient<Database>(url, key);
};
