"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Connector, useChainId } from "wagmi";
import { useMetamaskConnector } from "./useMetamaskConnector";

export function Connect() {
  const chainId = useChainId();
  const { connect, metaMaskConnector } = useMetamaskConnector();

  return (
    <div className="flex gap-4">
      {metaMaskConnector && (
        <ConnectorButton
          icon={metaMaskConnector.icon}
          connector={metaMaskConnector}
          onClick={() => connect({ connector: metaMaskConnector, chainId })}
        />
      )}
      {!metaMaskConnector && (
        <Link
          href="https://metamask.io/download/"
          target="_blank"
          className="p-2 text-sm font-medium bg-neutral-700 rounded-lg text-white flex gap-1 items-center justify-center"
        >
          Install Metamask
        </Link>
      )}
    </div>
  );
}

function ConnectorButton({
  connector,
  onClick,
  icon,
}: {
  connector: Connector;
  onClick: () => void;
  icon?: string;
}) {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector, setReady]);

  return (
    <button
      className="p-2 text-sm font-medium bg-neutral-700 rounded-lg text-white flex gap-1 items-center justify-center"
      disabled={!ready}
      onClick={onClick}
      type="button"
    >
      {icon && (
        <Image
          src={icon}
          width={20}
          height={20}
          alt="icon"
          className="rounded-full size-5"
        />
      )}
      {connector.name}
    </button>
  );
}
