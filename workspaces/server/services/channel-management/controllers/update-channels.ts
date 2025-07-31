import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";

export const updateChannels = async (req: Request, res: Response) => {
  try {
    console.log("Update channels");
    const {
      id,
      channel_name,
      channel_type,
      channel_description,
      power_level,
      channel_permissions,
      role_permissions,
      index,
      cooldown,
    } = req.query;

    const parsedChannelPermissions = JSON.parse(channel_permissions as string);
    const parsedRolePermissions = JSON.parse(role_permissions as string);

    const supabase = createSupabaseClient();

    // 1. Kanal bilgilerini güncelle
    const { error: channelError } = await supabase
      .from("channels")
      .update({
        channel_name,
        channel_type,
        channel_description,
        channel_permissions: parsedChannelPermissions,
        power_level,
        index,
        cooldown,
      })
      .eq("id", id);

    if (channelError) {
      return res.status(400).json({ error: channelError.message });
    }

    // 2. Mevcut role_permissions verilerini çek
    const { data: existingRolePermissions, error: fetchError } = await supabase
      .from("role_permissions")
      .select("role_id")
      .eq("channel_id", id);

    if (fetchError) {
      return res.status(400).json({ error: fetchError.message });
    }

    const incomingRoleIds = parsedRolePermissions.map(
      (rp: any) => rp.role_details.id,
    );

    const roleIdsToDelete = (existingRolePermissions || [])
      .filter((rp) => !incomingRoleIds.includes(rp.role_id))
      .map((rp) => rp.role_id);

    // 3. Eksik olan rolleri sil
    if (roleIdsToDelete.length > 0) {
      const { error: deleteError } = await supabase
        .from("role_permissions")
        .delete()
        .match({ channel_id: id })
        .in("role_id", roleIdsToDelete);

      if (deleteError) {
        return res.status(400).json({ error: deleteError.message });
      }
    }

    // 4. Upsert ile kalan rolleri güncelle
    for (const rolePermission of parsedRolePermissions) {
      const role_id = rolePermission.role_details.id;
      const permissions = rolePermission.permissions;

      const { error: roleError } = await supabase
        .from("role_permissions")
        .upsert(
          [
            {
              channel_id: id,
              role_id: role_id,
              permissions: permissions,
            },
          ],
          {
            onConflict: "channel_id,role_id",
          },
        );

      if (roleError) {
        return res.status(400).json({ error: roleError.message });
      }
    }

    return res.status(200).json({
      msg: "Channel and role permissions updated successfully.",
      channel: {
        id: Number(id),
        channel_name,
        channel_type,
        channel_description,
        power_level: Number(power_level),
        index: Number(index),
        cooldown: Number(cooldown),
        channel_permissions: parsedChannelPermissions,
        role_permissions: parsedRolePermissions,
      },
    });
  } catch (error) {
    return res.status(400).json({
      error: "Invalid input or JSON parse error.",
      details: (error as Error).message,
    });
  }
};
