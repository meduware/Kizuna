import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase.auth.admin.getUserById(id as string);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const formattedUser = {
      sub: data.user.user_metadata.sub,
      email: data.user.user_metadata.email,
      username: data.user.user_metadata.username,
      photo_url: data.user.user_metadata.photo_url,
      email_verified: data.user.user_metadata.email_verified,
      phone_verified: data.user.user_metadata.phone_verified,
    };

    return res.json({
      msg: "Users fetched successfully",
      user: formattedUser,
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
