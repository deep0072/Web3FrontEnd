import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { WagmiConfig } from "wagmi";
import { config } from "./config";
import Wallet from "./components/Wallet";

function App() {
  const [count, setCount] = useState(0);

  return (
    <WagmiConfig config={config}>
      <Wallet />
    </WagmiConfig>
  );
}

export default App;
