import { BorderBeam } from "@/components/magicui/border-beam";
import IconHolder from "@/components/ui/icon-holder";
import { generateHeader } from "@/utils/(mainpage)/helperFunctions";
import { Users } from "lucide-react";
import Link from "next/link";

export default function Contributor(): JSX.Element {
  return (
    <section
      id="contribute"
      className="min-h-[200px] my-10 flex flex-col gap-5 justify-center items-center w-full"
    >
      {generateHeader(
        "Get Connected!",
        `Our project is all about fostering meaningful relationships and connections. We're excited to have you join us and contribute to our success.`,
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
                <div className="bg-gradient-to-br from-green-400 to-blue-500 group-hover:from-green-300 group-hover:to-blue-400 rounded-md p-2 text-lg cursor-pointer transition-all text-white">
                  Get Started
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
