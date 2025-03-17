import { useState, useEffect, useCallback } from "react";
import { Button } from "../ui/button";
import { Send, Upload, X } from "lucide-react";
import { Input } from "../ui/input";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";
import { sendMessage } from "@/lib/messages";
import { useGlobalContext } from "@/context/store";

export default function MessageInput() {
  const { currentUser, currentChannel } = useGlobalContext();
  const translate = useTranslation();
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Adding the Escape key listener to clear selected files
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedFiles([]);
        setPreviewUrls([]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handlePaste = useCallback((event: ClipboardEvent) => {
    const clipboardItems = event.clipboardData?.items;
    if (!clipboardItems) return;

    const images: File[] = [];
    for (let i = 0; i < clipboardItems.length; i++) {
      const item = clipboardItems[i];
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) images.push(file);
      }
    }

    if (images.length > 0) {
      addFiles(images);
    }
  }, []); // Memoizing the function

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [handlePaste]);

  if (!currentUser || !currentChannel) {
    return null;
  }

  async function handleSubmit() {
    if (!currentUser) {
      throw new Error("User not found");
    }

    const trimmedInput = inputValue.trim();

    if (trimmedInput === "" && selectedFiles.length === 0) {
      return;
    }

    await sendMessage(
      trimmedInput,
      selectedFiles,
      currentUser.sub,
      currentChannel,
    );

    setInputValue("");
    setSelectedFiles([]);
    setPreviewUrls([]);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      addFiles(files);
    }
  }

  function addFiles(files: File[]) {
    const newFiles = files; // Aynı isimli dosyaları kontrol etmeden tüm dosyaları ekle

    setSelectedFiles((prevSelectedFiles) => [
      ...prevSelectedFiles,
      ...newFiles,
    ]);
    setPreviewUrls((prevUrls) => [
      ...prevUrls,
      ...newFiles.map((file) => URL.createObjectURL(file)),
    ]);
  }

  function removeFile(index: number) {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  }

  return (
    <div className="w-full sticky bottom-0 bg-sidebar border-t border-sidebar-border p-2 flex flex-col gap-4">
      {selectedFiles.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative group">
              {file.type.startsWith("image/") ? (
                <Image
                  src={previewUrls[index]}
                  alt={file.name}
                  width={20}
                  height={20}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-lg border">
                  <p className="text-xs text-gray-600">{file.name}</p>
                </div>
              )}

              <button
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 sm:opacity-0 sm:group-hover:opacity-100 opacity-100 hover:bg-primary transition"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 p-2 w-full">
        <input
          id="file-upload"
          type="file"
          className="hidden"
          multiple
          onChange={handleFileChange}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <Upload />
        </Button>

        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          className="flex items-center gap-2 w-full h-[60px]"
          placeholder={translate("Send a message")}
        />

        <Button
          variant="ghost"
          size="icon"
          onClick={handleSubmit}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : <Send />}
        </Button>
      </div>
    </div>
  );
}
