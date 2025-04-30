"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wallet, AlertCircle, CheckCircle, Info, ExternalLink } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export default function Web3Integration() {
  const [walletAddress, setWalletAddress] = useState("")
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "connecting" | "connected" | "rejected" | "error">(
    "idle",
  )
  const [errorMessage, setErrorMessage] = useState("")
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const connectWallet = async () => {
    if (typeof window === "undefined" || typeof window.ethereum === "undefined") {
      setConnectionStatus("error")
      setErrorMessage("MetaMask is not installed. Please install MetaMask to connect your wallet.")
      return
    }

    try {
      setConnectionStatus("connecting")

      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0])
        setConnectionStatus("connected")
      } else {
        throw new Error("No accounts found")
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)

      // Check if user rejected the request (MetaMask error code 4001)
      if (error.code === 4001) {
        setConnectionStatus("rejected")
        setErrorMessage(
          "You rejected the connection request. Connect your wallet to interact with blockchain features.",
        )
      } else {
        setConnectionStatus("error")
        setErrorMessage(`Failed to connect: ${error.message || "Unknown error"}`)
      }
    }
  }

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case "connected":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "rejected":
        return <AlertCircle className="w-6 h-6 text-amber-500" />
      case "error":
        return <AlertCircle className="w-6 h-6 text-red-500" />
      default:
        return null
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <section className="py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-8 text-center"
      >
        Web3 Integration
      </motion.h2>
      <div className="max-w-4xl mx-auto">
        <div className={`p-8 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-white bg-opacity-80 shadow-lg"}`}>
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block p-4 rounded-full bg-gradient-to-r from-teal-400 to-purple-500 mb-4"
            >
              <Wallet className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="text-2xl font-semibold mb-2">Connect Your Wallet</h3>
            <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Connecting your wallet allows you to interact with blockchain features, showcase NFT projects, and access
              personalized Web3 experiences on this portfolio.
            </p>
          </div>

          <div className="flex flex-col items-center">
            {connectionStatus === "idle" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={connectWallet}
                className="bg-gradient-to-r from-teal-400 to-purple-500 text-white px-6 py-3 rounded-full text-lg font-semibold flex items-center"
              >
                <Wallet className="w-5 h-5 mr-2" />
                Connect Wallet
              </motion.button>
            )}

            {connectionStatus === "connecting" && (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400"></div>
                <span className="ml-3">Connecting...</span>
              </div>
            )}

            <AnimatePresence>
              {(connectionStatus === "connected" ||
                connectionStatus === "rejected" ||
                connectionStatus === "error") && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mt-4 p-4 rounded-lg w-full max-w-md ${
                    connectionStatus === "connected"
                      ? theme === "dark"
                        ? "bg-green-900 bg-opacity-20"
                        : "bg-green-50 border border-green-200"
                      : connectionStatus === "rejected"
                        ? theme === "dark"
                          ? "bg-amber-900 bg-opacity-20"
                          : "bg-amber-50 border border-amber-200"
                        : theme === "dark"
                          ? "bg-red-900 bg-opacity-20"
                          : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div className="flex items-start">
                    {getStatusIcon()}
                    <div className="ml-3">
                      <h4 className="font-semibold">
                        {connectionStatus === "connected"
                          ? "Wallet Connected"
                          : connectionStatus === "rejected"
                            ? "Connection Rejected"
                            : "Connection Error"}
                      </h4>
                      {connectionStatus === "connected" ? (
                        <div>
                          <p className="text-sm mb-2">
                            Connected Wallet: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                          </p>
                          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                            Your wallet is now connected! You can now interact with blockchain features on this
                            portfolio.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <a
                              href={`https://etherscan.io/address/${walletAddress}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-teal-600 dark:text-teal-400 hover:underline"
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              View on Etherscan
                            </a>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm">{errorMessage}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {connectionStatus === "rejected" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={connectWallet}
                className="mt-4 bg-gradient-to-r from-teal-400 to-purple-500 text-white px-6 py-3 rounded-full text-lg font-semibold flex items-center"
              >
                <Wallet className="w-5 h-5 mr-2" />
                Try Again
              </motion.button>
            )}

            {connectionStatus === "error" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={connectWallet}
                className="mt-4 bg-gradient-to-r from-teal-400 to-purple-500 text-white px-6 py-3 rounded-full text-lg font-semibold flex items-center"
              >
                <Wallet className="w-5 h-5 mr-2" />
                Retry Connection
              </motion.button>
            )}
          </div>

          <div className={`mt-8 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"} pt-6`}>
            <div className="flex items-start">
              <Info className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
              <p className={`ml-3 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Your wallet information is never stored on our servers. This connection is only used to demonstrate Web3
                integration capabilities and to showcase how blockchain technology can be incorporated into modern web
                applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

