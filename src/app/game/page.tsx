"use client";
import React, { useEffect } from "react";
import Canvas from "@/components/canvas";
import Help from "@/components/help";
import { useStateContext } from "@/providers/state-provider";
import { useAccount, useConfig } from "wagmi";
import { ethers } from "ethers";
import abi from "../../abi/abi.json";
import { toast } from "sonner";

const GamePage = () => {
  const { gameStatus } = useStateContext();
  const { address } = useAccount();
  const { getClient } = useConfig();
  const rpcUrl = getClient().chain.rpcUrls.default.http[0];
  const privateKey = process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY;

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(
    "701c094401e5dae0530605656dd3d9bd80e867295447f7a727fafa8c96041887",
    provider
  );
  const contractAddress =
    `0x${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}` ||
    "0xAD0184027c0abAB6f4A0B853B5D36B01fD79a0D2";

  const contract = new ethers.Contract(contractAddress, abi, wallet);
  console.log("🚀 ~ GamePage ~ contract:", contract);
  const updateResult = async () => {
    const tx = await contract.endGame(address, BigInt(0), gameStatus === "won");
    await tx.wait();
    console.log("Transaction successful:", tx.hash);
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
    </div>
  );
};

export default GamePage;
