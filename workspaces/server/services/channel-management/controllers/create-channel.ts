import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";

export const createChannel = async (req: Request, res: Response) => {
  const supabase = createSupabaseClient();

  const { data: channels, error } = await supabase.from("channels").insert([
    {
      channel_name: "My Updated channel",
      channel_type: "text",
      channel_description: "My Updated channel description",
      channel_permissions: "power_level: 5",
    },
  ]);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ msg: "New channel added successfully." });
};
