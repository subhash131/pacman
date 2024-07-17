"use client";
import React, { createContext, useContext, useState } from "react";

type StateContextType = {
  betCardActive: boolean;
  setBetCardActive: React.Dispatch<React.SetStateAction<boolean>>;
  walletBalance: string;
  setWalletBalance: React.Dispatch<React.SetStateAction<string>>;
  gameStatus: "playing" | "won" | "lost";
  setGameStatus: React.Dispatch<
    React.SetStateAction<"playing" | "won" | "lost">
  >;
};

const StateContext = createContext<StateContextType>({
  betCardActive: false,
  setBetCardActive: () => {},
  walletBalance: "0.0",
  setWalletBalance: () => {},
  gameStatus: "playing",
  setGameStatus: () => {},
});

export const useStateContext = () => useContext(StateContext);

const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [betCardActive, setBetCardActive] = useState(false);
  const [walletBalance, setWalletBalance] = useState("0.0");
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );

  return (
    <StateContext.Provider
      value={{
        betCardActive,
        setBetCardActive,
        walletBalance,
        setWalletBalance,
        gameStatus,
        setGameStatus,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
