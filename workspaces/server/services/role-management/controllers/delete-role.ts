import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";

export const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.query;
  const supabase = createSupabaseClient();

  if (!id) {
    return res.status(400).json({ error: "Role ID is required." });
  }

  const { data, error } = await supabase.from("roles").delete().eq("id", id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ msg: "Role deleted successfully." });
};
