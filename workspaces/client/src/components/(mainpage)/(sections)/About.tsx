"use client";

import IconHolder from "@/components/ui/icon-holder";
import ShineBorder from "@/components/ui/shine-border";
import { aboutList, terminalCode } from "@/utils/(mainpage)/constants";
import {
  generateFeature,
  generateHeader,
} from "@/utils/(mainpage)/helperFunctions";
import { Code } from "lucide-react";

function generateCodeBlock(): JSX.Element {
  return (
    <ShineBorder
      className="relative flex w-full flex-col items-start justify-start rounded-lg border bg-slate-900"
      color={["#4ade80", "#3b82f6"]}
    >
      <div className="rounded-md bg-slate-900 overflow-hidden w-full">
        <div className="flex items-center mb-2">
          <div className="h-3 w-3 rounded-full mr-2 bg-red-500" />
          <div className="h-3 w-3 rounded-full mr-2 bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="text-white">
          <span className="font-bold">user@computer:</span>
          <span className="ml-1">~$</span>
          <span className="ml-2">cat config.json</span>
        </div>
        <pre className="text-gray-300 overflow-x-auto whitespace-pre-wrap">
          <code>{terminalCode}</code>
        </pre>
      </div>
    </ShineBorder>
  );
}
export default function About(): JSX.Element {
  return (
    <>
      <div className="text-center gap-2 mb-10 grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 items-center justify-center md:border-gradient">
        {aboutList.map(
          (
            x: { icon: JSX.Element; title: string; description: string },
            index: number,
          ): JSX.Element => generateFeature(x, index),
        )}
      </div>

      <section
        id="about"
        className="min-h-[200px] pt-[100px] flex flex-col justify-center items-center mx-3"
      >
        {generateHeader(
          "Build the way you want",
          "Take control of your chat app and tailor it to your unique needs with one simple config file.",
          <IconHolder icon={<Code />} />,
        )}
        {generateCodeBlock()}
      </section>
    </>
  );
}
