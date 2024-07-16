"use client";
import React, { createContext, useContext, useState } from "react";

type StateContextType = {
  betCardActive: boolean;
  setBetCardActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const StateContext = createContext<StateContextType>({
  betCardActive: false,
  setBetCardActive: () => {},
});

export const useStateContext = () => useContext(StateContext);

const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [betCardActive, setBetCardActive] = useState(false);

  return (
    <StateContext.Provider value={{ betCardActive, setBetCardActive }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
