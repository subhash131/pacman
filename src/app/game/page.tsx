"use client";
import React, { useEffect } from "react";
import { useStateContext } from "@/providers/state-provider";
import Canvas from "@/components/canvas";
import Help from "@/components/help";
import { useRouter } from "next/navigation";
import abi from "../../abi/abi.json";
import { toast } from "sonner";
import { Poppins } from "next/font/google";

import { useAccount } from "wagmi";
import { ethers } from "ethers";

const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});

const GamePage = () => {
  const { gameStatus, provider, setGameStatus, walletBalance } =
    useStateContext();
  const { address } = useAccount();
  const router = useRouter();
  const privateKey = process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY;

  const wallet = new ethers.Wallet(privateKey!, provider);
  const contractAddress: `0x${string}` =
    `0x${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}` ||
    "0xd2BBEf5C5d0c631f1D5E49b8e0991AAC8D980c92";

  const contract = new ethers.Contract(contractAddress, abi, wallet);
  const updateResult = async () => {
    const tx = await contract.endGame(address, gameStatus === "won");
    await tx.wait();
  };

  const claimReward = async () => {
    const tx = await contract.claimWinnings(address);
    await tx.wait();
  };

  useEffect(() => {
    if (!privateKey) {
      toast.error("Contract Owner Configuration is missing");
      return;
    }
    if (gameStatus !== "playing") updateResult();
  }, [gameStatus]);

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <Canvas />
      <Help />
      <div
        className={`${poppins.className} absolute size-full z-50 ${
          gameStatus === "playing" ? "top-[100vh]" : "top-0"
        } left-0 backdrop-blur-md transition-all duration-1000 delay-500 flex items-center justify-center`}
      >
        <div className="size-96 rounded-lg bg-neutral-700 text-white">
          <div
            onClick={claimReward}
            className="p-4 bg-white cursor-pointer text-black"
          >
            Button
          </div>
          <div>{walletBalance}</div>
          {gameStatus === "won" ? (
            <div className="size-full gap-8 flex-col flex items-center justify-center font-semibold text-2xl">
              Congratulations🎉! You win.
              <button
                onClick={claimReward}
                className="hover:scale-105 active:scale-95 transition-all text-base px-4 py-2 rounded-lg bg-white text-black"
              >
                Claim reward
              </button>
            </div>
          ) : (
            <div className="size-full gap-4 flex-col flex items-center justify-center font-semibold text-2xl">
              😕Better luck next time.
              <button
                onClick={() => {
                  router.push("/");
                  setGameStatus("playing");
                }}
                className="hover:scale-105 active:scale-95 transition-all text-lg px-4 py-2 rounded-lg bg-white text-black"
              >
                Go Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
