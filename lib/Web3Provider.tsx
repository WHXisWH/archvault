"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Web3Auth } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK, WALLET_ADAPTERS } from "@web3auth/base";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { WalletConnectV2Adapter } from "@web3auth/wallet-connect-v2-adapter";
import Web3 from "web3";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x4cb2f", // Filecoin Calibration testnet
  rpcTarget: "https://api.calibration.node.glif.io/rpc/v1",
  displayName: "Filecoin Calibration",
  blockExplorerUrl: "https://calibration.filfox.info/en",
  ticker: "tFIL",
  tickerName: "Test FIL",
  logo: "/logo.webp",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

interface Web3ContextType {
  web3auth: Web3Auth | null;
  provider: IProvider | null;
  web3: Web3 | null;
  address: string | null;
  isConnected: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  loginWithWallet: () => Promise<void>;
  logout: () => Promise<void>;
  getUserInfo: () => Promise<any>;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const useWeb3 = (): Web3ContextType => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDirectWallet, setIsDirectWallet] = useState(false);

  useEffect(() => {
    const savedWalletType = localStorage.getItem('wallet_connection_type');
    const savedAddress = localStorage.getItem('wallet_address');
    
    if (savedWalletType && savedAddress) {
      console.log("🔄 Found saved wallet connection:", { type: savedWalletType, address: savedAddress });
      setIsDirectWallet(savedWalletType === 'direct');
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        console.log("🔧 Web3Provider: Starting initialization...");
        const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID;
        
        if (!clientId) {
          console.warn("❌ Web3Auth client ID not provided, wallet connection disabled");
          setIsLoading(false);
          return;
        }
        
        const web3authInstance = new Web3Auth({
          clientId,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
          privateKeyProvider: privateKeyProvider as any,
          uiConfig: {
            appName: "ArchVault",
            logoLight: "/logo.webp",
            logoDark: "/logo.webp",
            defaultLanguage: "en",
            mode: "light",
            theme: {
              primary: "#0070f3",
            },
          },
        });

        await web3authInstance.init();
        setWeb3auth(web3authInstance);

        const savedWalletType = localStorage.getItem('wallet_connection_type');
        const savedAddress = localStorage.getItem('wallet_address');
        
        if (savedWalletType === 'web3auth' && web3authInstance.connected) {
          const web3authProvider = web3authInstance.provider;
          if (web3authProvider) {
            await handleConnection(web3authProvider);
          }
        } else if (savedWalletType === 'direct' && savedAddress) {
          await reconnectDirectWallet();
        }
      } catch (error) {
        console.error("❌ Web3Auth initialization failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const reconnectDirectWallet = async () => {
    try {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        let ethereum = (window as any).ethereum;
        
        if (ethereum.providers && ethereum.providers.length > 0) {
          const metamaskProvider = ethereum.providers.find((provider: any) => provider.isMetaMask);
          if (metamaskProvider) {
            ethereum = metamaskProvider;
          }
        }
        
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        
        if (accounts.length > 0) {
          const web3Instance = new Web3(ethereum);
          setWeb3(web3Instance);
          setProvider(ethereum);
          setAddress(accounts[0]);
          setIsConnected(true);
          setIsDirectWallet(true);
          
          localStorage.setItem('wallet_connection_type', 'direct');
          localStorage.setItem('wallet_address', accounts[0]);
          
          setupWalletEventListeners(ethereum);
        } else {
          localStorage.removeItem('wallet_connection_type');
          localStorage.removeItem('wallet_address');
        }
      }
    } catch (error) {
      console.error("❌ Direct wallet reconnection failed:", error);
      localStorage.removeItem('wallet_connection_type');
      localStorage.removeItem('wallet_address');
    }
  };

  const setupWalletEventListeners = (ethereum: any) => {
    ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length === 0) {
        handleWalletDisconnect();
      } else {
        setAddress(accounts[0]);
        localStorage.setItem('wallet_address', accounts[0]);
      }
    });

    ethereum.on('chainChanged', (chainId: string) => {
      // Handle chain change if needed, e.g., force a reload or show a notification
    });

    ethereum.on('disconnect', (error: any) => {
      handleWalletDisconnect();
    });
  };

  const handleWalletDisconnect = () => {
    setProvider(null);
    setWeb3(null);
    setAddress(null);
    setIsConnected(false);
    setIsDirectWallet(false);
    localStorage.removeItem('wallet_connection_type');
    localStorage.removeItem('wallet_address');
  };

  const handleConnection = async (web3authProvider: IProvider) => {
    try {
      setProvider(web3authProvider);
      const web3Instance = new Web3(web3authProvider as any);
      setWeb3(web3Instance);

      const accounts = await web3Instance.eth.getAccounts();
      
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);
        localStorage.setItem('wallet_connection_type', 'web3auth');
        localStorage.setItem('wallet_address', accounts[0]);
      }
    } catch (error) {
      console.error("❌ Connection handling failed:", error);
    }
  };

  const login = async () => {
    if (!web3auth) {
      console.error("❌ Web3Auth not initialized");
      return;
    }

    try {
      setIsLoading(true);
      const web3authProvider = await web3auth.connect();
      
      if (web3authProvider) {
        await handleConnection(web3authProvider);
      }
    } catch (error) {
      console.error("❌ Social login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithWallet = async () => {
    try {
      setIsLoading(true);
      
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        let ethereum = (window as any).ethereum;
        
        if (ethereum.providers && ethereum.providers.length > 0) {
          const metamaskProvider = ethereum.providers.find((provider: any) => provider.isMetaMask);
          if (metamaskProvider) {
            ethereum = metamaskProvider;
          }
        }
        
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        
        if (accounts.length > 0) {
          const currentChain = await ethereum.request({ method: 'eth_chainId' });
          
          if (currentChain !== chainConfig.chainId) {
            try {
              await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainConfig.chainId }],
              });
            } catch (switchError: any) {
              if (switchError.code === 4902) {
                await ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [{
                    chainId: chainConfig.chainId,
                    chainName: chainConfig.displayName,
                    nativeCurrency: {
                      name: chainConfig.tickerName,
                      symbol: chainConfig.ticker,
                      decimals: 18,
                    },
                    rpcUrls: [chainConfig.rpcTarget],
                    blockExplorerUrls: [chainConfig.blockExplorerUrl],
                  }],
                });
              } else {
                throw switchError;
              }
            }
          }
          
          const web3Instance = new Web3(ethereum);
          setWeb3(web3Instance);
          setProvider(ethereum);
          setAddress(accounts[0]);
          setIsConnected(true);
          setIsDirectWallet(true);
          localStorage.setItem('wallet_connection_type', 'direct');
          localStorage.setItem('wallet_address', accounts[0]);
          
          setupWalletEventListeners(ethereum);
        }
      } else {
        alert("MetaMask is not installed. Please install MetaMask or use social login instead.");
      }
    } catch (error) {
      console.error("❌ Direct wallet connection failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      
      if (isDirectWallet) {
        handleWalletDisconnect();
      } else if (web3auth) {
        await web3auth.logout();
        setProvider(null);
        setWeb3(null);
        setAddress(null);
        setIsConnected(false);
        localStorage.removeItem('wallet_connection_type');
        localStorage.removeItem('wallet_address');
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.error("Web3Auth not initialized");
      return null;
    }

    try {
      const userInfo = await web3auth.getUserInfo();
      return userInfo;
    } catch (error) {
      console.error("Get user info failed:", error);
      return null;
    }
  };

  const value: Web3ContextType = {
    web3auth,
    provider,
    web3,
    address,
    isConnected,
    isLoading,
    login,
    loginWithWallet,
    logout,
    getUserInfo,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}