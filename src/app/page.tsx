import About from "@/components/(mainpage)/(sections)/About";
import Features from "@/components/(mainpage)/(sections)/Features";
import Footer from "@/components/(mainpage)/(sections)/Footer";
import Hero from "@/components/(mainpage)/(sections)/Hero";
import Navbar from "@/components/(mainpage)/Navbar/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full">
      <div className="absolute inset-0 bg-[url(/grid.svg)] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] -z-50 h-[800px]" />
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Footer />
    </main>
  )
}
