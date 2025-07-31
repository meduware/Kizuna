"use client";

import About from "@/components/(routes)/marketing/(sections)/About";
import Contributor from "@/components/(routes)/marketing/(sections)/Contributer";
import Footer from "@/components/(routes)/marketing/(sections)/Footer";
import Hero from "@/components/(routes)/marketing/(sections)/Hero";
import Features from "@/components/(routes)/marketing/(sections)/Product";
import Navbar from "@/components/(routes)/marketing/Navbar/Navbar";

export default function Home(): JSX.Element {
  return (
    <main className="flex flex-col items-center w-full">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Contributor />
      <Footer />
    </main>
  );
}
