"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Connector, useChainId, useConnect } from "wagmi";

export function Connect() {
  const chainId = useChainId();
  const { connectors, connect } = useConnect();
  const [filteredConnector, setFilteredConnector] = useState<Connector>();

  useEffect(() => {
    connectors.forEach((connector) => {
      if (
        connector.type === "injected" &&
        connector.name.toLowerCase() === "metamask"
      ) {
        setFilteredConnector(connector);
      }
    });
  }, []);

  return (
    <div className="flex gap-4">
      {filteredConnector && (
        <ConnectorButton
          icon={filteredConnector.icon}
          connector={filteredConnector}
          onClick={() => connect({ connector: filteredConnector, chainId })}
        />
      )}
      {!filteredConnector && (
        <Link
          href="https://metamask.io/download/"
          target="_blank"
          className="p-2 text-sm font-medium bg-neutral-700 rounded-lg text-white flex gap-1 items-center justify-center"
        >
          Add Metamask
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
