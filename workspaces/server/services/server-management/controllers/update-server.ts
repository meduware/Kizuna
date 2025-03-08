import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";
import { v4 as uuidv4 } from "uuid";

export const updateServer = async (req: Request, res: Response) => {
  const {
    server_name,
    login_methods,
    max_participants_per_vc,
    bitrate,
    stream_quality,
    stream_fps,
    file_upload_limit,
  } = req.body;

  const server_image = req.file;

  const supabase = createSupabaseClient();

  const { data: serverData, error: fetchError } = await supabase
    .from("server_details")
    .select("id, server_name, server_image")
    .single();

  if (fetchError) {
    return res.status(400).json({ error: fetchError.message });
  }

  const serverId = serverData.id;
  let publicUrl = serverData.server_image;
  let serverName = server_name || serverData.server_name;

  if (server_image) {
    if (publicUrl) {
      const oldPhotoPath = publicUrl.split("/").slice(-2).join("/");
      await supabase.storage.from("avatars").remove([oldPhotoPath]);
    }

    const fileExtension = server_image.originalname.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `avatars/${fileName}`;

    const { data, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, server_image.buffer, {
        contentType: server_image.mimetype,
      });

    if (uploadError) {
      return res.status(400).json({ error: uploadError.message });
    }

    publicUrl = supabase.storage.from("avatars").getPublicUrl(filePath)
      .data.publicUrl;
  }

  const { error: serverUpdateError } = await supabase
    .from("server_details")
    .update({ server_name: serverName, server_image: publicUrl })
    .eq("id", serverId);

  if (serverUpdateError) {
    return res.status(400).json({ error: serverUpdateError.message });
  }

  const technicalUpdateData: any = {};

  if (login_methods) {
    try {
      technicalUpdateData.login_methods = login_methods
        .split(",")
        .map((method: string) => method.trim());
    } catch (error) {
      console.log("Raw login_methods:", req.body.login_methods);
      console.log("login_methods:", login_methods);
      return res.status(400).json({
        error: "Invalid login_methods format. It should be a JSON array.",
      });
    }
  }

  if (max_participants_per_vc)
    technicalUpdateData.max_participants_per_vc = max_participants_per_vc;
  if (bitrate) technicalUpdateData.bitrate = bitrate;
  if (stream_quality) technicalUpdateData.stream_quality = stream_quality;
  if (stream_fps) technicalUpdateData.stream_fps = stream_fps;
  if (file_upload_limit)
    technicalUpdateData.file_upload_limit = file_upload_limit;

  const { error: technicalUpdateError } = await supabase
    .from("technical_details")
    .update(technicalUpdateData)
    .eq("server_id", serverId);

  if (technicalUpdateError) {
    return res.status(400).json({ error: technicalUpdateError.message });
  }

  return res.status(200).json({
    msg: "Server information updated successfully.",
    server: {
      server_name,
      server_image: publicUrl,
      technical_details: technicalUpdateData,
    },
  });
};
