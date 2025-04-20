import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";

export const createChannel = async (req: Request, res: Response) => {
  const channelPermissions = {
    join_vc: true,
    send_media: true,
    read_history: true,
    send_message: true,
    view_channel: true,
  };

  const channelDetails = {
    channel_name: req.query.channel_name,
    channel_type: req.query.channel_type,
    channel_description: req.query.channel_description,
    channel_permissions: channelPermissions,
    power_level: 100,
    index: 10,
    cooldown: 0,
    server_id: 1,
  };
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("channels")
    .insert([channelDetails])
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  data.role_permissions = [];
  console.log(data);
  return res
    .status(200)
    .json({ msg: "New channel added successfully.", channel: data });
};
