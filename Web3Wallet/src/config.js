import { WagmiConfig, createConfig, configureChains, sepolia } from 'wagmi'
 
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
 
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const { chains, publicClient } = configureChains(
    [sepolia],
    [alchemyProvider({ apiKey: '9YRSRcfvmLC4U194tkYHkjJSiDtZ7Wqq' })],
  )


  // Set up wagmi config
export const config = createConfig({
    autoConnect: true,
    connectors: [
      new InjectedConnector({ chains })],
    
    publicClient,
    options: {
      shimDisconnect: false,
    },

  })