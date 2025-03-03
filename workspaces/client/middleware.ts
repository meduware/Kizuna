import { NextRequest, NextResponse } from "next/server";
import { defaultLocale } from "@/lib/translation";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { supportedLocales } from "@/lib/translation";

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const languagePreference = getCookie("languagePreference", { cookies });

  const hasLocalePrefix = supportedLocales.some((locale) =>
    pathname.startsWith(`/${locale}`),
  );

  if (!hasLocalePrefix) {
    return NextResponse.redirect(
      new URL(
        `${languagePreference ? languagePreference : defaultLocale}${pathname}`,
        req.url,
      ),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|avatars).*)"],
};
// Middleware'in çalışmasını istediğimiz yolları belirtiyoruz
