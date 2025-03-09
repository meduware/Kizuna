import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";

export const updateChannels = async (req: Request, res: Response) => {
  const {
    id,
    channel_name,
    channel_type,
    channel_description,
    channel_permissions,
  } = req.query;

  const supabase = createSupabaseClient();

  const { data: serverData, error: fetchError } = await supabase
    .from("channels")
    .select(
      "channel_name, channel_type, channel_description, channel_permissions",
    )
    .single();
  if (fetchError) {
    return res.status(400).json({ error: fetchError.message });
  }

  const updatedChannelData = {
    channel_name: channel_name || serverData.channel_name,
    channel_type: channel_type || serverData.channel_type,
    channel_description: channel_description || serverData.channel_description,
    channel_permissions:
      JSON.parse(channel_permissions as string) ||
      serverData.channel_permissions,
  };

  const { data, error } = await supabase
    .from("channels")
    .update(updatedChannelData)
    .eq("id", id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({
    msg: "Channel information updated successfully.",
    channel: updatedChannelData,
  });
};
