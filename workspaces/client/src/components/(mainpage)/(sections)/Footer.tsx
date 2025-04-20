import { FooterLink } from "@/lib/types";
import { footerLinks } from "@/utils/(mainpage)/constants";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function Footer(): JSX.Element {
  const translation = useTranslation();

  return (
    <footer className="pb-16 mt-32 text-sm leading-6">
      <div className="mx-auto divide-y divide-primary/20 px-4 sm:px-6 md:px-8">
        <div className="sm:flex grid gap-2">
          {footerLinks.map((section: FooterLink) => (
            <div key={section.title} className="m-5">
              <h2 className="font-semibold text-foreground/80 text-sm">
                {translation(section.title)}
              </h2>
              <ul className="mt-3 space-y-2">
                {section.links.map((link: { name: string; href: string }) => (
                  <li key={link.name}>
                    <Link
                      className="hover:text-foreground/80 text-foreground/60"
                      href={link.href}
                    >
                      {translation(link.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-10">
          <Link href="/" className="text-3xl font-bold text-left">
            <span className="text-primary">{process.env.PROJECT_NAME}</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
