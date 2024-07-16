"use client";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-black">
      <Navbar />
      <Hero />
    </main>
  );
}
