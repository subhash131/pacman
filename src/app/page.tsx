"use client";
import { Profile } from "@/components/test/demo";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="w-screen h-screen">
      {/* <Canvas /> */}
      <Suspense fallback={"loading..."}>
        <Profile />
      </Suspense>
      {/* <div className="absolute top-0 left-0 size-full">
        <button className="p-2 bg-white text-black rounded-lg">connect</button>
      </div> */}
    </main>
  );
}
