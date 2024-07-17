import BetPopup from "@/components/bet-popup";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      <Navbar />
      <Hero />
      <BetPopup />
    </main>
  );
}
