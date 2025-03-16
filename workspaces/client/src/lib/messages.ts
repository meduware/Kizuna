import { useGlobalContext } from "@/context/store";
import { createSupabaseClient } from "../../../shared/src/supabase/createClient";
import { v4 as uuidv4 } from "uuid"; // UUID modülünü ekliyoruz

const supabase = createSupabaseClient();

async function uploadFiles(files: File[]): Promise<string[]> {
  const fileUrls: string[] = [];

  for (const file of files) {
    // Rastgele bir UUID oluşturuluyor
    const randomFileName = `${uuidv4()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("files") // "uploads" storage bucket'ını kullan
      .upload(`images/${randomFileName}`, file); // Dosyayı yükle ve rastgele bir isim ver

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
  user_id: string,
  channel_id: number,
) {
  // Dosyaları Supabase Storage'a yükle
  const fileUrls = await uploadFiles(files);

  // Mesajı ve dosya URL'lerini messages tablosuna kaydet
  const { data, error } = await supabase.from("messages").insert([
    {
      message: inputValue,
      files: fileUrls.length > 0 ? fileUrls : [], // Eğer dosya varsa dosya URL'lerini array olarak sakla, yoksa boş array
      user_id,
      channel_id,
    },
  ]);

  if (error) {
    console.error("Supabase insert error:", error.message);
    return;
  }

  return { msg: "Message successfully sent" };
}
