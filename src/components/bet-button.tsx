"use client";
import { config } from "@/providers/config";
import React, { useEffect, useState } from "react";
import { useAccount, useChainId, useWriteContract } from "wagmi";
import { parseAbi } from "viem";

import abi from "../abi/abi.json";
import { useMetamaskConnector } from "./useMetamaskConnector";
import { toast } from "sonner";
import { useStateContext } from "@/providers/state-provider";

const BetButton = () => {
  const chainId = useChainId();
  const { isConnected: isWalletConnected } = useAccount();
  const { connect, metaMaskConnector } = useMetamaskConnector();
  const [betClicked, setBetClicked] = useState(false);
  const { betCardActive, setBetCardActive } = useStateContext();

  const { writeContract } = useWriteContract({ config });
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  useEffect(() => {
    if (isWalletConnected) {
      setBetCardActive(true);
    }
  }, [isWalletConnected, betClicked]);

  const handleBetNow = () => {
    if (!metaMaskConnector) {
      toast.error("Metamask not found!");
      return;
    }

    if (!isWalletConnected) {
      connect({ connector: metaMaskConnector, chainId });
    }
    setBetClicked((prev) => !prev);
    // writeContract({
    //   abi: parseAbi(["function placeBet()"]),
    //   address: contractAddress
    //     ? `0x${contractAddress}`
    //     : "0xAD0184027c0abAB6f4A0B853B5D36B01fD79a0D2",
    //   functionName: "placeBet",
    //   // @ts-ignore
    //   value: 1,
    // });
  };
  return (
    <button
      className={`px-6 hover:scale-105 active:scale-95 transition-all py-2 bg-white rounded-xl text-black font-semibold mt-10 disabled:bg-neutral-500`}
      onClick={handleBetNow}
    >
      Bet now
    </button>
  );
};

export default BetButton;
