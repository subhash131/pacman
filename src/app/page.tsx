import Canvas from "@/components/canvas";

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <Canvas />
      <div className="absolute top-0 left-0 size-full">
        <button className="p-2 bg-white text-black rounded-lg">connect</button>
      </div>
    </main>
  );
}
