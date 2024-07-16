"use client";
import React, { useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";

import { useMetamaskConnector } from "./useMetamaskConnector";
import { toast } from "sonner";
import { useStateContext } from "@/providers/state-provider";

const BetButton = () => {
  const chainId = useChainId();
  const { isConnected: isWalletConnected } = useAccount();
  const { connect, metaMaskConnector } = useMetamaskConnector();
  const [betClicked, setBetClicked] = useState(false);
  const { setBetCardActive } = useStateContext();

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
