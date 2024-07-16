import { Poppins } from "next/font/google";
import Image from "next/image";
import React from "react";

const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});

const Hero = () => {
  return (
    <div
      className={`relative w-full h-full text-white px-10 flex gap-2 items-center flex-col text-center justify-center pb-20 ${poppins.className}`}
    >
      <div className="absolute top-14 gap-2 left-64 rotate-12 flex items-center justify-center">
        <p className="text-xl font-bold drop-shadow-2xl lowercase bg-[#F1EDFE] text-[#5F01FF] rounded-lg p-4 rotate-6">
          1. place bet
        </p>
        <Image
          src="/arrow.svg"
          items-center
          justify-center
          alt="arrow"
          width={10}
          height={10}
          className="size-32"
        />
      </div>
      <div className="absolute top-20 gap-2 right-44 flex flex-col items-center justify-center">
        <p className="text-xl font-bold drop-shadow-2xl lowercase bg-[#F1EDFE] text-[#5F01FF] rounded-lg p-4 -rotate-3 ">
          2. Play game
        </p>
        <Image
          src="/arrow.svg"
          items-center
          justify-center
          alt="arrow"
          width={10}
          height={10}
          className="size-32 rotate-90"
        />
      </div>
      <div className="absolute bottom-28 gap-2 left-60 flex flex-col items-center justify-center">
        <Image
          src="/arrow.svg"
          items-center
          justify-center
          alt="arrow"
          width={10}
          height={10}
          className="size-32 -rotate-90"
        />
        <p className="text-xl font-bold drop-shadow-2xl lowercase bg-[#F1EDFE] text-[#5F01FF] rounded-lg p-4 -rotate-6 ">
          3. Collect reward
        </p>
      </div>
      <h3 className="text-4xl font-bold w-[60%] ">Win Faster with BetX</h3>
      <h3 className="text-6xl text-[#5F01FF] drop-shadow-lg font-bold -rotate-1 w-[60%] tracking-wide bg-[#F1EDFE] py-3 rounded-2xl ">
        Bet Smart. Bet Secure.
      </h3>
      <h3 className="text-3xl font-bold w-[60%] ">
        Instant and Fair Betting with BetX!
      </h3>
      <button className="px-6 hover:scale-105 active:scale-95 transition-all py-2 bg-white rounded-xl text-black font-semibold mt-10">
        Play now
      </button>
    </div>
  );
};

export default Hero;