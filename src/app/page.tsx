import About from "@/components/(sections)/About";
import Features from "@/components/(sections)/Features";
import Hero from "@/components/(sections)/Hero";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full">
      <div className="absolute inset-0 bg-[url(/grid.svg)] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] -z-50 h-[800px]" />
      <Navbar />
      <Hero />
      <About />
      <Features />
    </main>
  )
}
