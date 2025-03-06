import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 0;

    const supabase = createSupabaseClient();

    const { data, error } = await supabase.auth.admin.listUsers(
      limit > 0 ? { page: page - 1, perPage: limit } : undefined,
    );

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const formattedUsers = data.users.map((user) => ({
      sub: user.user_metadata.sub,
      email: user.user_metadata.email,
      username: user.user_metadata.username,
      photo_url: user.user_metadata.photo_url,
      email_verified: user.user_metadata.email_verified,
      phone_verified: user.user_metadata.phone_verified,
    }));

    return res.json({
      msg: "Users fetched successfully",
      users: formattedUsers,
      pagination: {
        page,
        limit: limit || 0,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
