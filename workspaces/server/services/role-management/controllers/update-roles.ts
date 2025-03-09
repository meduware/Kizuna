import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";

export const updateRoles = async (req: Request, res: Response) => {
  const { id, role_name, role_color, permissions } = req.query;
  const supabase = createSupabaseClient();

  const { data: serverData, error: fetchError } = await supabase
    .from("roles")
    .select("role_name, role_color, permissions")
    .eq("id", id)
    .single();

  if (fetchError) {
    return res.status(400).json({ error: fetchError.message });
  }

  let parsedPermissions;
  try {
    parsedPermissions = permissions
      ? JSON.parse(permissions as string)
      : serverData.permissions;
  } catch (error) {
    return res.status(400).json({ error: "Invalid permissions format." });
  }

  const updatedRoleData = {
    role_name: role_name || serverData.role_name,
    role_color: role_color || serverData.role_color,
    permissions: parsedPermissions,
  };

  const { data, error } = await supabase
    .from("roles")
    .update(updatedRoleData)
    .eq("id", id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({
    msg: "Role information updated successfully.",
    role: updatedRoleData,
  });
};
