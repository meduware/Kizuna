import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";

export const addRole = async (req: Request, res: Response) => {
  const { role_id, user_id } = req.query;

  // TypeScript hatalarını önlemek için değerleri string olarak tanımla
  if (typeof role_id !== "string" || typeof user_id !== "string") {
    return res.status(400).json({ error: "Invalid role_id or user_id" });
  }

  const supabase = createSupabaseClient();

  // Kullanıcının zaten bir rolü var mı kontrol et
  const { data: existingRole, error: fetchError } = await supabase
    .from("user_roles")
    .select("*")
    .eq("user_id", user_id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    // `PGRST116`: Veri bulunamazsa gelen hata kodu (PostgREST hatası)
    return res.status(400).json({ error: fetchError.message });
  }

  if (existingRole) {
    // Kullanıcının rolü varsa güncelle
    const { data, error } = await supabase
      .from("user_roles")
      .update({ role_id }) // ✅ `update()` nesne almalı
      .eq("user_id", user_id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({
      msg: "Role updated successfully.",
      data,
    });
  } else {
    // Kullanıcının rolü yoksa yeni bir kayıt oluştur
    const { data, error } = await supabase.from("user_roles").insert([
      {
        user_id,
        role_id,
      },
    ]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({
      msg: "Role assigned successfully.",
    });
  }
};
