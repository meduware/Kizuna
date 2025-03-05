import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";
import { v4 as uuidv4 } from "uuid";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const photoFile = req.file;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const supabase = createSupabaseClient();
  let publicUrl: string;

  if (photoFile) {
    const fileExtension = photoFile.originalname.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    const filePath = `avatars/${fileName}`;
    const { data, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, photoFile.buffer, { contentType: photoFile.mimetype });

    if (uploadError) {
      return res.status(400).json({ error: uploadError.message });
    }

    publicUrl = supabase.storage.from("avatars").getPublicUrl(filePath)
      .data.publicUrl;
  } else {
    publicUrl = supabase.storage
      .from("avatars")
      .getPublicUrl("default/profile-picture.png").data.publicUrl;
  }

  const { data: userData, error: signUpError } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        username: username,
        photo_url: publicUrl,
      },
    },
  });

  if (signUpError) {
    return res.status(400).json({ error: signUpError.message });
  }

  if (!userData || !userData.user) {
    return res
      .status(500)
      .json({ error: "User registration failed, no user data returned." });
  }

  const formattedUser = {
    sub: userData.user.user_metadata.sub,
    email: userData.user.user_metadata.email,
    username: userData.user.user_metadata.username,
    photo_url: userData.user.user_metadata.photo_url,
    email_verified: userData.user.user_metadata.email_verified,
    phone_verified: userData.user.user_metadata.phone_verified,
  };

  return res.json({
    msg: "User created successfully.",
    user: formattedUser,
    access_token: userData.session?.access_token,
  });
};
