require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require('hardhat-deploy');
require("hardhat-deploy-ethers");
require("hardhat-etherscan-abi");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-web3");

const {
	normalizeHardhatNetworkAccountsConfig
} = require("hardhat/internal/core/providers/util")

const {
	BN,
	bufferToHex,
	privateToAddress,
	toBuffer
} = require("ethereumjs-util")

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const networkConfig = hre.config.networks["hardhat"]


	const accounts = normalizeHardhatNetworkAccountsConfig(networkConfig.accounts)

	console.log("Accounts")
	console.log("========")

	for (const [index, account] of accounts.entries()) {
		const address = bufferToHex(privateToAddress(toBuffer(account.privateKey)))
		const privateKey = bufferToHex(toBuffer(account.privateKey))
		const balance = new BN(account.balance).div(new BN(10).pow(new BN(18))).toString(10)
		console.log(`Account #${index}: ${address} (${balance} ETH) Private Key: ${privateKey}`)
	}
});

const ALCHEMY_API_KEY = "b6SjxtNF-pkQvchq_WQYcz-C5fszKzXd";
const ETHERSCAN_API_KEY = "XEC7CGKNWPH4PUVY7JD7G47GZVRWIW787P";
const PRIVATE_KEY = "a784e3ea8e02b8d7ae4d62628501a872dbadbae76a4d6d0b7e36c188b9fdd381";


module.exports = {
	networks: {
		hardhat: {
			forking: {
				enabled: true,
				url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
				blockNumber: 10713612
			}
		},
		rinkeby: {
			url: `https://eth-rinkeby.alchemyapi.io/v2/b6SjxtNF-pkQvchq_WQYcz-C5fszKzXd`,
			accounts: [`0x${PRIVATE_KEY}`]
		}
	},
	namedAccounts: {
		deployer: {
			default: 0,
		},
		caller: {
			default: 1
		},
		staker: {
			default: 2
		}
	},
	etherscan: {
		apiKey: ETHERSCAN_API_KEY
	},
	solidity: "0.8.7"
};
