import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    const supabase = createSupabaseClient();

    // Kullanıcıyı sil
    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      return res.status(404).json({ error: error.message });
    }

    return res.json({ msg: "User deleted successfully." });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
