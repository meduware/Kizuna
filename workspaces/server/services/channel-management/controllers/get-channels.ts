import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";

export const getChannels = async (req: Request, res: Response) => {
  const supabase = createSupabaseClient();

  const { data: channels, error } = await supabase
    .from("channels")
    .select(
      `*, role_permissions(role_details:roles(id, role_name, role_color), permissions)`,
    );

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const formattedChannels = channels.map((channel) => {
    return {
      ...channel,
      role_permissions:
        channel.role_permissions.length > 0
          ? {
            role_details: channel.role_permissions[0].role_details,
            permissions: channel.role_permissions[0].permissions,
          }
          : [],
    };
  });

  return res.status(200).json({ channels: channels });
};
