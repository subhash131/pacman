"use client";
import Canvas from "@/components/canvas";
import { Profile } from "@/components/web3/demo";

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden">
      <Canvas />
      <div className="absolute left-0 top-0 size-full">
        <Profile />
      </div>
    </main>
  );
}
