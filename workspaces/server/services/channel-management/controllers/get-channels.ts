import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";

export const getChannels = async (req: Request, res: Response) => {
  const supabase = createSupabaseClient();

  const { data: channels, error } = await supabase.from("channels").select("*");
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ channels });
};
