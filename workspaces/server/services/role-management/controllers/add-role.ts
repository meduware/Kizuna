import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";

export const addRole = async (req: Request, res: Response) => {
  const { role_id, user_id } = req.query;

  if (typeof role_id !== "string" || typeof user_id !== "string") {
    return res.status(400).json({ error: "Invalid role_id or user_id" });
  }

  const supabase = createSupabaseClient();

  const { data: existingRole, error: fetchError } = await supabase
    .from("user_roles")
    .select("*")
    .eq("user_id", user_id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    return res.status(400).json({ error: fetchError.message });
  }

  if (existingRole) {
    const { data, error } = await supabase
      .from("user_roles")
      .update({ role_id })
      .eq("user_id", user_id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({
      msg: "Role updated successfully.",
      data,
    });
  } else {
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
