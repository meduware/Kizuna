import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";

export const removeRole = async (req: Request, res: Response) => {
  const { user_id } = req.query;

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("user_roles")
    .delete()
    .eq("user_id", user_id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json({
    msg: "Role removed from user successfully.",
  });
};
