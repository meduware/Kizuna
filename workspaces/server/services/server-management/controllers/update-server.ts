import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";
import { v4 as uuidv4 } from "uuid";

export const updateServer = async (req: Request, res: Response) => {
  const {
    server_name,
    welcome_channel,
    log_channel,
    log_enabled,
    login_methods,
    file_sharing,
    capacities,
  } = req.body;

  const server_image = req.file;

  const supabase = createSupabaseClient();

  const { data: serverData, error: fetchError } = await supabase
    .from("server_details")
    .select("id, server_name, server_image, welcome_channel, log_channel, log_enabled")
    .single();

  if (fetchError) {
    return res.status(400).json({ error: fetchError.message });
  }

  const serverId = serverData.id;
  let publicUrl = serverData.server_image;
  let serverName = server_name || serverData.server_name;
  let welcomeChannel = welcome_channel || serverData.welcome_channel;
  let logChannel = log_channel || serverData.log_channel;

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

    publicUrl = supabase.storage.from("avatars").getPublicUrl(filePath).data.publicUrl;
  }

  const { error: serverUpdateError } = await supabase
    .from("server_details")
    .update({
      server_name: serverName,
      server_image: publicUrl,
      welcome_channel: welcomeChannel,
      log_channel: logChannel,
      log_enabled,
    })
    .eq("id", serverId);

  if (serverUpdateError) {
    return res.status(400).json({ error: serverUpdateError.message });
  }

  const technicalUpdateData: any = {};

  if (login_methods) {
    try {
      const parsed = typeof login_methods === "string" ? JSON.parse(login_methods) : login_methods;

      technicalUpdateData.login_methods = {
        passwordAuth: parsed.passwordAuth,
        oAuthSupport: parsed.oAuthSupport,
        allowRegister: parsed.allowRegister,
        anonymousLogin: parsed.anonymousLogin,
        oAuthProviders: {
          google: parsed.oAuthProviders?.google,
          github: parsed.oAuthProviders?.github,
          apple: parsed.oAuthProviders?.apple,
        },
      };
    } catch (error) {
      return res.status(400).json({
        error: "Invalid login_methods format. It should be a JSON object.",
      });
    }
  }

  if (file_sharing) {
    try {
      const parsed = typeof file_sharing === "string" ? JSON.parse(file_sharing) : file_sharing;

      technicalUpdateData.file_sharing = {
        maxFileSize: parsed.maxFileSize,
        retentionPolicy: parsed.retentionPolicy,
        allowedFileTypes: {
          audio: parsed.allowedFileTypes?.audio,
          video: parsed.allowedFileTypes?.video,
          images: parsed.allowedFileTypes?.images,
          documents: parsed.allowedFileTypes?.documents,
        },
        userStorageQuota: parsed.userStorageQuota,
      };
    } catch (error) {
      return res.status(400).json({
        error: "Invalid file_sharing format. It should be a JSON object.",
      });
    }
  }

  if (capacities) {
    try {
      const parsed = typeof capacities === "string" ? JSON.parse(capacities) : capacities;

      technicalUpdateData.capacities = {
        bitrate: parsed.bitrate,
        streamFps: parsed.streamFps,
        apiRateLimit: parsed.apiRateLimit,
        streamQuality: parsed.streamQuality,
        maxRoomCapacity: parsed.maxRoomCapacity,
        maxServerCapacity: parsed.maxServerCapacity,
        maxConcurrentConnections: parsed.maxConcurrentConnections,
      };
    } catch (error) {
      return res.status(400).json({
        error: "Invalid capacities format. It should be a JSON object.",
      });
    }
  }

  if (Object.keys(technicalUpdateData).length > 0) {
    const { error: technicalUpdateError } = await supabase
      .from("technical_details")
      .update(technicalUpdateData)
      .eq("server_id", serverId);

    if (technicalUpdateError) {
      return res.status(400).json({ error: technicalUpdateError.message });
    }
  }

  return res.status(200).json({
    msg: "Server information updated successfully.",
    server: {
      server_name: serverName,
      server_image: publicUrl,
      technical_details: technicalUpdateData,
    },
  });
};
