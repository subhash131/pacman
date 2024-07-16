"use client";
import { useStateContext } from "@/providers/state-provider";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Link from "next/link";
import { toast } from "sonner";

const BetPopup = () => {
  const { betCardActive, setBetCardActive, walletBalance } = useStateContext();
  const [betAmount, setBetAmount] = useState("100");

  const handlePlaceBet = () => {
    if (!betAmount) toast.error("Enter a valid bet amount");
  };
  return (
    <div
      className={`${
        betCardActive ? "top-0" : "top-[100vh]"
      } absolute top-0 left-0 size-full flex items-center justify-center transition-all duration-500 backdrop-blur-md`}
    >
      <div
        className={`z-50 relative bg-neutral-700 text-white px-4 w-[30%] h-[40%] rounded-xl `}
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
          <div className="flex gap-2 mt-6 items-start text-sm w-full">
            <label className="text-nowrap">Bet Amount: </label>
            <input
              className="bg-transparent outline-none border-b w-full"
              placeholder="Amount in wei"
              type="number"
              max={500000}
              min={0}
              onChange={(e) => {
                if (!e.target.value) setBetAmount("");
                if (Number(e.target.value) > 500000) {
                  e.preventDefault();
                  toast.error("Max limit is 500,000");
                  return;
                }
                if (e.target.value) setBetAmount(e.target.value);
              }}
              autoFocus={betCardActive}
              value={betAmount}
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
            className="bg-white py-2 text-black font-semibold px-10 rounded-lg"
            onClick={handlePlaceBet}
          >
            Bet
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetPopup;
