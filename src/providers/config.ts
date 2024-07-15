import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
  ssr: true,
  chains: [sepolia],
  connectors: [metaMask()],
  transports: {
    [sepolia.id]: http(),
  },
});
