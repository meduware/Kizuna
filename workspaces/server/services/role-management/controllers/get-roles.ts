import { Request, Response } from "express";
import { createSupabaseClient } from "../../../../shared/src/supabase/createClient";

export const getRoles = async (req: Request, res: Response) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.from("roles").select("*");

  if (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: error });
  } else {
    return res.status(200).json({ data });
  }
};
