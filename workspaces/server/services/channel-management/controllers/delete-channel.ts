import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";

export const deleteChannel = async (req: Request, res: Response) => {
  const { channel_id } = req.query;

  const supabase = createSupabaseClient();

  const { data: channels, error } = await supabase
    .from("channels")
    .delete()
    .eq("id", channel_id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ msg: "Channel deleted successfully." });
};
