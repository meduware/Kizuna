import About from "@/components/(mainpage)/(sections)/About";
import Contributor from "@/components/(mainpage)/(sections)/Contributer";
import Footer from "@/components/(mainpage)/(sections)/Footer";
import Hero from "@/components/(mainpage)/(sections)/Hero";
import Product from "@/components/(mainpage)/(sections)/Product";
import Navbar from "@/components/(mainpage)/Navbar/Navbar";

export default function Home(): JSX.Element {
  return (
    <main className="flex flex-col items-center w-full">
      <Navbar />
      <Hero />
      <About />
      {/* <Product /> */}
      <Contributor />
      <Footer />
    </main>
  )
}
