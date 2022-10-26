const { expect } = require("chai");
const {
	ethers: {
		getContractFactory,
		BigNumber,
		getNamedSigners
	}
} = require("hardhat");

// https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html
// import in hardhat.config.js
// write signers
// import hardhat-deploy in hardhat-config
// create signers in tests

describe("Deposit: ", function () {

	let accounts;
	let deployer, owner, caller, holder;

  	it("Should invest with correct args: ", async function () {
    	const Deposit = await getContractFactory("Deposit");
    	const deposit = await Deposit.deploy({ value: BigNumber.from("10000000000000000000") });
    	await deposit.deployed();

		accounts = await getNamedSigners();
		({ deployer, owner, caller, holder } = accounts);

		await deposit.connect(caller).invest({ value: BigNumber.from("1000000000") });

		expect(await deposit.investings(caller.address)).to.equal(BigNumber.from("1000000000"));

  	});
});