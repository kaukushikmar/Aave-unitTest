require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");
require("hardhat-contract-sizer");

/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const MAINNET_FORKING_URL = process.env.MAINNET_RPC_URL;

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.8" },
      { version: "0.8.0" },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmation: 6,
    },
    hardhat: {
      chainId: 31337,
      forking: {
        url: MAINNET_FORKING_URL,
      },
    },
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    gasPrice: 250,
    coinmarketcap: process.env.COIN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
      5: 1,
    },
    user: {
      default: 1,
    },
    player: {
      default: 2,
    },
  },
  mocha: {
    timeout: 200000, // 200 seconds of timeout for any listener
  },
};
