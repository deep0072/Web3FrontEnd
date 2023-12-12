import React, { useRef, useState } from "react";
import { createClient, http } from "viem";
import { sepolia } from "viem/chains";
import { useBalance } from "wagmi";

const client = createClient({
  chain: sepolia,
  transport: http(),
});

const GetWalletInfo = () => {


  const [address, setAddress] = useState(null);
  const wordRef = useRef();



  const handleChange = (event) => {
    wordRef.current.textContent = event.target.value;
  };


  return (
    <div>
      GetWalletInfo
      <div>
        <input
          type="text"
         
          onChange={handleChange}
          placeholder="enter wallet address"
        />
        {/* <button onClick={handleClick}>getInfo</button> */}
        <div>{address && address}</div>

        <span ref={wordRef}></span>

        {/* <GetBalanceOfUser address={yourAddress} /> */}
      </div>
    </div>
  );
};

export default GetWalletInfo;

const GetBalanceOfUser = ({ address }) => {
  const { data, isError } = useBalance({
    address: address,
  });
  console.log(address, "address");
};
