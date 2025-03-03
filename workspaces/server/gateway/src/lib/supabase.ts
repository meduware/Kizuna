import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";
import { SupabaseClient } from "@supabase/supabase-js";

const supabase: SupabaseClient = createSupabaseClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export { supabase };
