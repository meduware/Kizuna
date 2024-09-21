import GridPattern from "@/components/ui/grid-pattern";

export default function Hero() {
  return (
    <section id="hero" className="flex flex-col items-center justify-center space-y-4 min-h-[700px] px-5">
      <GridPattern className="absolute inset-0 -z-50 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] h-[800px]" />
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

      <h1 className="sm:text-8xl text-3xl font-bold text-center">Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">{process.env.PROJECT_NAME}</span></h1>
      <p className="text-lg text-center opacity-80">A self-hosted, open-source chat app tailored for secure and private communication.</p>
    </section>
  )
}
