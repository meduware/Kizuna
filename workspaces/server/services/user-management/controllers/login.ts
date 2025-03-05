import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.query;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  // Supabase istemcisini oluştur
  const supabase = createSupabaseClient();

  // Supabase Auth ile kullanıcıyı giriş yap
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email as string,
    password: password as string,
  });

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
    msg: `Login successful.`,
    user: formattedUser,
    access_token: data.session?.access_token,
  });
};
