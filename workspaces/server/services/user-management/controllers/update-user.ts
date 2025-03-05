import { Request, Response } from "express";
import multer from "multer";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";
import { v4 as uuidv4 } from "uuid";

// Multer ile dosya yükleme işlemi
const storage = multer.memoryStorage();
export const upload = multer({ storage }).single("photo");

export const updateUser = async (req: Request, res: Response) => {
  const { id, email, username, password, email_verified, phone_verified } =
    req.body;
  const photoFile = req.file; // Yüklenen fotoğraf dosyası

  if (!id) {
    return res.status(400).json({ error: "User ID is required." });
  }

  // Supabase istemcisini oluştur
  const supabase = createSupabaseClient();

  // Kullanıcının mevcut bilgilerini al
  const { data: userData, error: fetchError } =
    await supabase.auth.admin.getUserById(id);
  if (fetchError || !userData?.user) {
    return res.status(404).json({ error: "User not found." });
  }

  const currentUser = userData.user;
  let publicUrl = currentUser.user_metadata?.photo_url; // Mevcut fotoğraf URL'si

  // Yeni fotoğraf yüklendi mi?
  if (photoFile) {
    // Eğer eski fotoğraf varsa sil
    if (publicUrl) {
      const oldPhotoPath = publicUrl.split("/").slice(-2).join("/"); // Depolama yolu belirle
      await supabase.storage.from("avatars").remove([oldPhotoPath]);
    }

    // Yeni fotoğraf yükle
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
  }

  // Güncelleme nesnesini oluştur
  const updateUserData: any = {};
  if (email) updateUserData.email = email;
  if (password) updateUserData.password = password;
  if (email_verified) updateUserData.email_verified = email_verified;
  if (phone_verified) updateUserData.phone_verified = phone_verified;

  updateUserData.user_metadata = {
    username: username || currentUser.user_metadata?.username,
    email: email || currentUser.user_metadata?.email,
    email_verified: email_verified || currentUser.user_metadata?.email_verified,
    phone_verified: phone_verified || currentUser.user_metadata?.phone_verified,
    photo_url: publicUrl,
  };

  // Kullanıcıyı güncelle
  const { data: updatedUser, error } = await supabase.auth.admin.updateUserById(
    id,
    updateUserData,
  );

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json({
    msg: "User information updated successfully.",
    user: {
      id: updatedUser.user.id,
      email: updatedUser.user.email,
      username: updatedUser.user.user_metadata?.username,
      photo_url: updatedUser.user.user_metadata?.photo_url,
    },
  });
};
