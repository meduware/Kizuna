"use client";

import Meteors from "@/components/magicui/meteors";
import GridPattern from "@/components/ui/grid-pattern";

export default function Hero(): JSX.Element {

  return (
    <section id="hero" className="flex flex-col items-center justify-center space-y-4 my-16 gap-16 px-5 overflow-hidden">
      <GridPattern className="-z-50 absolute inset-0 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] h-[800px]" />
      <div className="absolute h-[300px] w-full top-0 overflow-hidden -z-50">
        <Meteors number={10} />
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <a href={process.env.PROJECT_REPO} target="__blank">
          <button className="pl-4 pr-2 py-1 group rounded-full relative group text-sm border border-zinc-700">
            <div className="absolute inset-x-0 h-px w-1/5 group-hover:w-1/3 mx-auto -top-px bg-gradient-to-r from-transparent via-slate-300 group-hover:via-white to-transparent transition-all" />
            <span className="relative flex items-center opacity-80 group-hover:opacity-100 transition-all">
              {process.env.PROJECT_NAME} is Open Source
              <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-0.5 transition-all">
                <path d="M10.75 8.75L14.25 12L10.75 15.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </span>
          </button>
        </a>
        <h1 className="sm:text-7xl text-3xl font-bold text-center dark:text-slate-200">Where <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">privacy-first</span> chat begins</h1>
        <p className="text-xl text-center opacity-80">A self-hosted, open-source chat app tailored for secure and private communication.</p>
      </div>

      <section className="flex justify-end relative overflow-hidden">
        <div className="flex h-[500px] w-full [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] flex-col items-center justify-center rounded-xl border bg-primary-foreground md:shadow-xl">
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b w-[1216px] from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10" />
          {/* NOTE: BorderBeam is couse performance loss. */}
          {/* <BorderBeam size={50} duration={12} delay={9} /> */}
          {/* TODO: Add image here. */}
        </div>
      </section>
    </section>
  );
}

