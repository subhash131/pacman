"use client";
import React, { useEffect, useState } from "react";
import { useStateContext } from "@/providers/state-provider";
import Canvas from "@/components/canvas";
import Help from "@/components/help";
import { useRouter } from "next/navigation";
import abi from "../../abi/abi.json";
import { toast } from "sonner";
import { Poppins } from "next/font/google";

import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { ethers } from "ethers";

const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});

const GamePage = () => {
  const { gameStatus, provider, setGameStatus } = useStateContext();
  const { address } = useAccount();
  const router = useRouter();
  const privateKey = process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY;

  const [buttonMsg, setButtonMsg] = useState<
    "Updating result" | "Claim reward" | "Go Home"
  >("Updating result");

  const [txHash, setTxHash] = useState("");

  const { isSuccess } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}`,
  });

  useEffect(() => {
    if (isSuccess) setButtonMsg("Claim reward");
  }, [isSuccess]);

  const wallet = new ethers.Wallet(privateKey!, provider);
  const contractAddress: `0x${string}` =
    `0x${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}` ||
    "0xd2BBEf5C5d0c631f1D5E49b8e0991AAC8D980c92";

  const contract = new ethers.Contract(contractAddress, abi, wallet);
  const updateResult = async () => {
    try {
      const tx = await contract.endGame(address, gameStatus === "won");
      await tx.wait();
      setTxHash(tx.hash);
    } catch (e) {
      toast.error("Something went wrong😶");
    }
  };

  const claimReward = async () => {
    if (buttonMsg === "Claim reward") {
      try {
        const tx = await contract.claimWinnings(address);
        await tx.wait();
        setButtonMsg("Go Home");
      } catch (e) {
        toast.error("failed to claim reward😕");
      }
    } else if (buttonMsg === "Go Home") {
      router.push("/");
    }
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
          {gameStatus === "won" ? (
            <div className="size-full gap-8 flex-col flex items-center justify-center font-semibold text-2xl">
              Congratulations🎉! You win.
              <button
                onClick={claimReward}
                className="hover:scale-105 active:scale-95 transition-all text-base px-4 py-2 rounded-lg bg-white text-black"
              >
                {buttonMsg}
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
