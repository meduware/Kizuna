import { useGlobalContext } from "@/context/GlobalContext";
import { createSupabaseClient } from "../../../shared/src/supabase/createClient";
import { v4 as uuidv4 } from "uuid";

const supabase = createSupabaseClient();

async function uploadFiles(files: File[]): Promise<string[]> {
  const fileUrls: string[] = [];

  for (const file of files) {
    const randomFileName = `${uuidv4()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("files")
      .upload(`images/${randomFileName}`, file);

    if (error) {
      console.error("File upload error:", error.message);
      continue;
    }

    const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/files/${data.path}`;
    fileUrls.push(fileUrl);
  }

  return fileUrls;
}

export async function sendMessage(
  inputValue: string,
  files: File[],
  user_id: number,
  channel_id: number
) {
  const fileUrls = await uploadFiles(files);

  const { data: user_role, error: userRolesError } = await supabase
    .from("user_roles")
    .select("id")
    .eq("id", user_id)
    .single();

  if (userRolesError) {
    console.error("Error fetching user roles:", userRolesError);
    return;
  }

  const { data, error } = await supabase.from("messages").insert([
    {
      message: inputValue,
      files: fileUrls.length > 0 ? fileUrls : [],
      user_role_id: user_role.id,
      channel_id,
    },
  ]);

  if (error) {
    console.error("Supabase insert error:", error.message);
    return;
  }

  return { msg: "Message successfully sent" };
}
