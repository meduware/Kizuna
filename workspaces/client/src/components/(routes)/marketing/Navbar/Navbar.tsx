"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { Menu } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { LangToggle } from "@/components/ui/LangToggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar(): JSX.Element {
  const translation = useTranslation();

  const [scrollY, setScrollY] = useState(0);
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      if (sectionId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`flex justify-between items-center sticky top-6 p-3 px-4 m-3 transition-all z-50 ${scrollY > 100 ? "w-3/6 sm:min-w-[600px] min-w-[330px] shadow-xl rounded-full border bg-background" : "w-full"}`}
    >
      <div className="flex items-center justify-center">
        <h1
          className="font-semibold text-xl mr-5 cursor-pointer bg-clip-text text-primary"
          onClick={() => scrollToSection("hero")}
        >
          {process.env.PROJECT_NAME}
        </h1>
        <div className="space-x-2 md:block hidden">
          <Button variant={"ghost"} onClick={() => scrollToSection("about")}>
            {translation("About")}
          </Button>
          <Button variant={"ghost"} onClick={() => scrollToSection("features")}>
            {translation("Features")}
          </Button>
          <Link
            href="/docs/introduction"
            className={buttonVariants({ variant: "ghost" })}
          >
            {translation("Docs")}
          </Link>
        </div>
      </div>

      <div className="space-x-2 flex">
        <div className="md:flex hidden space-x-2">
          <Link
            href="/channels"
            className={buttonVariants({ variant: "default" })}
          >
            <span className="font-semibold">{translation("Get Started")}</span>
          </Link>
          <ModeToggle />
          <LangToggle />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"ghost"} className="md:hidden flex">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col" side={"right"}>
            <SheetHeader>
              <h1
                className="font-semibold text-2xl cursor-pointer"
                onClick={() => scrollToSection("hero")}
              >
                {process.env.PROJECT_NAME}
              </h1>
            </SheetHeader>
            <div className="absolute right-10 top-1">
              <ModeToggle />
            </div>
            <SheetClose asChild>
              <Button
                variant={"ghost"}
                onClick={() => scrollToSection("about")}
              >
                {translation("About")}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                variant={"ghost"}
                onClick={() => scrollToSection("features")}
              >
                {translation("Features")}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/docs/introduction"
                className={buttonVariants({ variant: "ghost" })}
              >
                {translation("Docs")}
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <SheetHeader>
                <Link
                  href="/channels"
                  className={buttonVariants({ variant: "default" })}
                >
                  <span className="font-semibold">
                    {translation("Get Started")}
                  </span>
                </Link>
              </SheetHeader>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
