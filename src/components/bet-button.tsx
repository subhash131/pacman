"use client";
import { config } from "@/providers/config";
import React, { useEffect } from "react";
import { useAccount, useChainId, useWriteContract, Connector } from "wagmi";

import abi from "../abi/abi.json";
import { useMetamaskConnector } from "./useMetamaskConnector";
import { toast } from "sonner";

const BetButton = () => {
  const chainId = useChainId();
  const { address, isConnected: isWalletConnected, connector } = useAccount();
  const { connect, metaMaskConnector } = useMetamaskConnector();

  const [ready, setReady] = React.useState(false);
  useEffect(() => {
    if (!metaMaskConnector) return;
    (async () => {
      const provider = await metaMaskConnector.getProvider();
      setReady(!!provider);
    })();
  }, [metaMaskConnector, setReady]);

  const { writeContract } = useWriteContract();
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const handleBetNow = () => {
    if (!ready) {
      toast.error("Metamask is loading");
      return;
    }
    if (!metaMaskConnector) {
      toast.error("Metamask not found!");
      return;
    }
    if (!isWalletConnected) {
      connect({ connector: metaMaskConnector, chainId });
    }
    const res = writeContract({
      abi,
      address: contractAddress
        ? `0x${contractAddress}`
        : "0xAD0184027c0abAB6f4A0B853B5D36B01fD79a0D2",
      functionName: "placeBet",
      args: [1],
    });

    console.log("🚀 ~ handleBetNow ~ res:", res);
  };
  return (
    <button
      className="px-6 hover:scale-105 active:scale-95 transition-all py-2 bg-white rounded-xl text-black font-semibold mt-10"
      onClick={handleBetNow}
      disabled={ready}
    >
      Bet now
    </button>
  );
};

export default BetButton;
