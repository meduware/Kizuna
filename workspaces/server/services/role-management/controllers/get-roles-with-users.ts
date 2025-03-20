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
        users:user_roles(
          users(
            id,
            email,
            created_at,
            username,
            photo_url
          )
        )
      `
  );

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const formattedData = data.map((role) => ({
    ...role,
    users: role.users.map((userObj) => userObj.users),
  }));

  res.status(200).json(formattedData);
};
