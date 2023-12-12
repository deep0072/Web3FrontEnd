import React, { useState } from "react";
import {
  useConnect,
  useEnsName,
  useAccount,
  useBalance,
  useDisconnect,
} from "wagmi";
import { Erc20Contracts, Erc20ContractsWrite } from "./Erc20Contracts";
import GetWalletInfo from "./GetWalletInfo";

const Wallet = () => {
  const { disconnect } = useDisconnect();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data, isError } = useBalance({
    address: address,
  });

  const [toggleErc20Contract, setToggleErc20Contract] = useState(false);
  // console.log(toggleErc20Contract, "toggleErc20Contract");
  // console.log(address, "address");
  console.log(data)

  return (
    <>
      <div>
        {connectors.map((connector) => (
          <button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            {connector.name}
            {!connector.ready && " (unsupported)"}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              " (connecting)"}
            <div style={{position: 'fixed', top: 0, left: 0,margin:'20px'}}>{address? <div>wallet address: {address}</div> :""}</div>

            <div style={{position: 'fixed', top: 0, left: 0,height:'200px',margin:'20px'}}>{address? <h3>wallet balance: { data?.formatted} </h3> : ""}</div>
          </button>
        ))}
        `{" "}
        <div >
          {address && (
            <button
              onClick={() => setToggleErc20Contract(!toggleErc20Contract)}
            >
              getBalanceOfDcCoin
            </button>
          )}
        </div>
        {toggleErc20Contract && <Erc20Contracts OwnerAddress={address} />}
        {address && <Erc20ContractsWrite OwnerAddress={address}/>}
        {/* {error && <div>{error.message}</div>} */}
      </div>
      <div style={{position: 'fixed', top: 0, right: 0,margin:'20px'}}>
        {!isDisconnected && (
          <button onClick={() => disconnect()}>disconnect</button>
        )}


      </div>

      <GetWalletInfo />

      
    </>
  );
};

export default Wallet;
