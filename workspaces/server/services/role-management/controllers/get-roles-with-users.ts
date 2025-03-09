import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";

export const getRolesWithUsers = async (req: Request, res: Response) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.from("roles").select(
    `
      id,
      role_name,
      role_color,
      permissions,
      user_roles:user_roles!inner(
        user_id,
        users!inner(
          id,
          email,
          username,
          photo_url
        )
      )
      `,
  );

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({
    data,
  });
};
