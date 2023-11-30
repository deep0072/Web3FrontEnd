import React, { useState } from "react";
import { useContractReads, useContractWrite } from "wagmi";
import { erc20abi } from "./ABI/abi";
import { Erc20ContractAddress } from "./Contracts/Address";

export const erc20Contract = {
  address: Erc20ContractAddress,
  abi: erc20abi,
};

export const Erc20Contracts = ({ OwnerAddress }) => {
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...erc20Contract,
        functionName: "getBalanceOf",
        args: [OwnerAddress],
      },
    ],
  });
  // console.log(typeof (data[0].result), "data")

  console.log(OwnerAddress);

  return (
    <div>
      Erc20Contracts
      {OwnerAddress && (
        <h5>
          {" "}
          {OwnerAddress} has total dc coin is {data[0].result.toString()}
        </h5>
      )}
    </div>
  );
};

export const Erc20ContractsWrite = ({OwnerAddress}) => {
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState("0x");
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: Erc20ContractAddress,
    abi: erc20abi,
    functionName: "transfer",
	args:[recipient,amount]
  });

  return (
    <div>
      <div>
        <label htmlFor="">enter amount</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor=""> enter address</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>

      <button
        onClick ={() =>
          write()
        }
      >
        transfer
      </button>

      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
};
