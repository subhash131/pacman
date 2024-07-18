"use client";
import { ethers, JsonRpcProvider } from "ethers";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useConfig } from "wagmi";

type Transaction = {
  hash: `0x${string}` | undefined;
  confirmed: boolean;
};

type StateContextType = {
  betCardActive: boolean;
  setBetCardActive: React.Dispatch<React.SetStateAction<boolean>>;
  walletBalance: string;
  setWalletBalance: React.Dispatch<React.SetStateAction<string>>;
  gameStatus: "playing" | "won" | "lost";
  setGameStatus: React.Dispatch<
    React.SetStateAction<"playing" | "won" | "lost">
  >;
  provider: JsonRpcProvider | undefined;
  setProvider: React.Dispatch<
    React.SetStateAction<JsonRpcProvider | undefined>
  >;
  lastTransaction: Transaction;
  setLastTransaction: React.Dispatch<React.SetStateAction<Transaction>>;
};

const StateContext = createContext<StateContextType>({
  betCardActive: false,
  setBetCardActive: () => {},
  walletBalance: "0.0",
  setWalletBalance: () => {},
  gameStatus: "playing",
  setGameStatus: () => {},
  provider: undefined,
  setProvider: () => {},
  lastTransaction: { hash: undefined, confirmed: false },
  setLastTransaction: () => {},
});

export const useStateContext = () => useContext(StateContext);

const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [betCardActive, setBetCardActive] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<Transaction>({
    hash: undefined,
    confirmed: false,
  });
  const [walletBalance, setWalletBalance] = useState("0.0");
  const [provider, setProvider] = useState<JsonRpcProvider>();
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );

  const { getClient } = useConfig();
  const rpcUrl = getClient().chain.rpcUrls.default.http[0];

  useEffect(() => {
    const rpcProvider = new ethers.JsonRpcProvider(rpcUrl);
    setProvider(rpcProvider);
  }, [rpcUrl]);

  return (
    <StateContext.Provider
      value={{
        provider,
        setProvider,
        betCardActive,
        setBetCardActive,
        walletBalance,
        setWalletBalance,
        gameStatus,
        setGameStatus,
        lastTransaction,
        setLastTransaction,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
