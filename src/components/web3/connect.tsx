"use client";
import Image from "next/image";
import React from "react";
import { Connector, useChainId, useConnect } from "wagmi";

export function Connect() {
  const chainId = useChainId();
  const { connectors, connect, isPending } = useConnect();

  return (
    <div className="flex gap-4">
      {!isPending &&
        connectors.map((connector) => {
          return (
            <div key={connector.uid}>
              {connector.type === "injected" && (
                <ConnectorButton
                  icon={connector.icon}
                  connector={connector}
                  onClick={() => connect({ connector, chainId })}
                />
              )}
            </div>
          );
        })}
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
      className="p-2 bg-black rounded-lg text-white flex gap-2 items-center justify-center"
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
