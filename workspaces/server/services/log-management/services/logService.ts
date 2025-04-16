import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";
import { Log } from "../models/logModel";

const supabase = createSupabaseClient(); // Use the existing client

// Create a new log entry
export async function createLog(log: Log) {
  const { data, error } = await supabase.from("logs").insert([log]);
  if (error) throw error;
  return data;
}

// Fetch logs with pagination
export async function getLogs(page: number = 1, limit: number = 10) {
  const offset = (page - 1) * limit;
  const { data, error } = await supabase
    .from("logs")
    .select("*")
    .order("timestamp", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
}
