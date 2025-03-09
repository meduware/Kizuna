import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";

export const createRole = async (req: Request, res: Response) => {
  const { role_name, role_color, permissions } = req.query;
  const supabase = createSupabaseClient();

  const { data: serverData, error } = await supabase.from("roles").insert([
    {
      role_name: role_name,
      role_color: role_color,
      permissions: JSON.parse(permissions as string),
    },
  ]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({
    msg: "New role added successfully.",
    role: {
      role_name: role_name,
      role_color: role_color,
      permissions: JSON.parse(permissions as string),
    },
  });
};
