import { BorderBeam } from "@/components/ui/border-beam";
import IconHolder from "@/components/ui/icon-holder";
import { generateHeader } from "../helpers";
import { Users } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function Contributor(): JSX.Element {
  const translation = useTranslation();

  return (
    <section
      id="contribute"
      className="min-h-[200px] my-10 flex flex-col gap-5 justify-center items-center w-full"
    >
      {generateHeader(
        translation("Get Connected!"),
        translation(
          "Our project is all about fostering meaningful relationships and connections. We're excited to have you join us and contribute to our success.",
        ),
        <IconHolder icon={<Users />} />,
      )}
      <Link href="/channels">
        <div className="flex relative group">
          <div className="border rounded-xl p-0.5">
            <BorderBeam
              size={20}
              duration={12}
              delay={5}
              colorFrom="grey"
              colorTo="grey"
            />
            <div className="border rounded-xl p-0.5">
              <BorderBeam
                size={20}
                duration={12}
                delay={9}
                colorFrom="grey"
                colorTo="grey"
              />
              <div className="border rounded-xl p-1 relative">
                <BorderBeam
                  size={20}
                  duration={12}
                  delay={2}
                  colorFrom="grey"
                  colorTo="grey"
                />
                <div className="bg-primary group-hover:bg-primary/80 transition-all rounded-md p-2 text-lg cursor-pointer transition-all text-primary-foreground">
                  {translation("Get Started")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
