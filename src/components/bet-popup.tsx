"use client";
import React, { useEffect, useState } from "react";
import { useStateContext } from "@/providers/state-provider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { toast } from "sonner";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { config } from "@/providers/config";

import { parseAbi } from "viem";

const BetPopup = () => {
  const router = useRouter();
  const {
    betCardActive,
    setBetCardActive,
    walletBalance,
    setLastTransaction,
    lastTransaction,
  } = useStateContext();
  const [betAmount, setBetAmount] = useState("100");
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const {
    writeContract,
    isError,
    isPending,
    isSuccess,
    reset,
    data: hash,
  } = useWriteContract({ config });

  const { isSuccess: txSuccess } = useWaitForTransactionReceipt({
    hash,
    config,
    retryCount: 10,
  });

  useEffect(() => {
    if (txSuccess) {
      setLastTransaction({ confirmed: true, hash });
      router.push("/game");
    }
  }, [txSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Error occurred! please try again");
      reset();
    }
  }, [isError]);

  useEffect(() => {
    if (lastTransaction.confirmed) router.push("/game");
  }, [lastTransaction.confirmed]);

  const handlePlaceBet = () => {
    if (!betAmount) {
      toast.error("Enter a valid bet amount");
      return;
    }
    if (Number(walletBalance) * 10 ** 18 < Number(betAmount)) {
      toast.error("Low wallet balance please add faucets!!");
      return;
    }
    writeContract({
      abi: parseAbi(["function placeBet()"]),
      address: contractAddress
        ? `0x${contractAddress}`
        : "0x29bcb51A93ED4b01fA6885694ee622Bf061e4E14",
      functionName: "placeBet",
      // @ts-ignore
      value: betAmount,
    });
  };
  return (
    <div
      className={`${
        betCardActive ? "top-0" : "top-[100vh]"
      } absolute top-0 left-0 size-full flex items-center justify-center transition-all duration-500 backdrop-blur-md`}
    >
      <div
        className={`z-50 relative bg-neutral-700 text-white px-4 min-w-[30%] h-[40%] w-fit rounded-xl `}
      >
        <div className="w-full h-12 items-center justify-between flex ">
          <p className="text-xs font-semibold">
            Wallet balance: {walletBalance} ETH
          </p>
          <button
            onClick={() => {
              setBetCardActive(false);
            }}
          >
            <IoClose strokeWidth={2} size={20} />
          </button>
        </div>
        <div className="w-full h-[calc(100%-3rem)] p-4 flex flex-col items-center">
          <div className="flex gap-2 items-start text-sm w-full">
            <label className="text-nowrap">Bet Amount: </label>
            <input
              className="bg-transparent outline-none border-b w-full"
              placeholder="Amount in wei"
              type="number"
              max={500000}
              min={0}
              onChange={(e) => {
                if (!e.target.value) setBetAmount("");
                if (Number(e.target.value) < 1) {
                  e.preventDefault();
                  toast.error("The minimum limit is 1 wei.");
                  return;
                }
                if (Number(e.target.value) > 500000) {
                  e.preventDefault();
                  toast.error("The maximum limit is 500,000");
                  return;
                }
                if (e.target.value) setBetAmount(e.target.value);
              }}
              autoFocus={betCardActive}
              value={betAmount}
            />
          </div>
          <div className="flex gap-2 mt-6 items-start text-sm w-full">
            <label className="text-nowrap">If you win, you will receive </label>
            <input
              className="bg-transparent outline-none w-full"
              disabled
              value={`${Number(betAmount) * 2} wei`}
            />
          </div>
          <div className="w-full flex justify-center items-center text-center h-full text-xs text-red-500 font-semibold gap-1 flex-col">
            <span className="flex gap-1">
              <IoIosInformationCircleOutline size={18} strokeWidth={5} /> Low
              faucets?{" "}
              <Link
                target="_blank"
                href="https://cloud.google.com/application/web3/faucet/ethereum/sepolia"
                className="underline text-white"
              >
                click here add sepolia faucet
              </Link>
            </span>
            <span className="flex gap-1">
              <IoIosInformationCircleOutline size={18} strokeWidth={5} />
              You can place a maximum bet of 500,000 wei at a time.
            </span>
          </div>
          <button
            className="bg-white transition-transform hover:scale-105 py-2 text-black font-semibold px-10 rounded-lg disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:scale-100"
            onClick={handlePlaceBet}
            disabled={isSuccess || isPending}
          >
            {isPending && (
              <AiOutlineLoading3Quarters className="animate-spin" />
            )}
            {!isPending && !isSuccess && !isError && "Confirm"}
            {isSuccess && !txSuccess && "confirmation pending..."}
            {txSuccess && "Loading Game..."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetPopup;
