import { Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/hooks/useTranslation";
import { usePathname, useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export function LangToggle() {
  const translation = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const Navigate = async (lang: string) => {
    const remainingPath = lang + "/" + pathname?.split("/").slice(2).join("/");
    setCookie("languagePreference", lang);

    router.push(remainingPath);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => Navigate("/en")}>
          {translation("lang_en")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => Navigate("/tr")}>
          {translation("lang_tr")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
