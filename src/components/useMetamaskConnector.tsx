"use client";
import { useEffect, useState } from "react";
import { Connector, useConnect } from "wagmi";

const useMetamaskConnector = () => {
  const { connectors, connect } = useConnect();
  const [metaMaskConnector, setMetaMaskConnector] = useState<Connector>();

  useEffect(() => {
    connectors.forEach((connector) => {
      if (
        connector.type === "injected" &&
        connector.name.toLowerCase() === "metamask"
      ) {
        setMetaMaskConnector(connector);
      }
    });
  }, [connectors]);
  return { metaMaskConnector, connect };
};

export { useMetamaskConnector };
