import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";
import { getService } from "../services/handler";

export const serverDetails = async (req: Request, res: Response) => {
  const supabase = createSupabaseClient();

  const { data: server_details, error } = await supabase
    .from("server_details")
    .select(
      "server_name, server_image, created_at, technical_details(bitrate, stream_fps, login_methods, stream_quality, max_participants_per_vc, file_upload_limit)",
    )
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (!server_details) {
    return res.status(404).json({ error: "No server details found" });
  }

  const modifiedServerDetails = {
    ...server_details,
    technical_details: {
      ...server_details.technical_details,
      ipAddress: getService()!.domain,
      port: process.env.GATEWAY_PORT || 3001,
    },
  };

  return res.status(200).json({ server_details: modifiedServerDetails });
};
