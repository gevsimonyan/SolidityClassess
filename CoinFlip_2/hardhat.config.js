require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");

// /home/rootnad/Exio/SolidityClasses/secondGroup/CoinFlip/.gitignore

const ALCHEMY_API = "";
const PRIVATE_KEY = "";
const ETHERSCAN_API = "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API
  },
  solidity: "0.8.9",
};
