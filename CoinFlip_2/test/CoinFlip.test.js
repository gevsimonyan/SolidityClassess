const {
  time,
  loadFixture,
  mine
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lock", function () {
    async function deployCoinFlipFixture() {

        const [owner, caller, otherAccount] = await ethers.getSigners();
        
        const CoinFlip = await ethers.getContractFactory("CoinFlip");
        console.log(CoinFlip)
        const game = await CoinFlip.deploy();
        const tokenAddress = await game.token();
        console.log("Token address is: ", tokenAddress);
        const token = await ethers.getContractAt("GameToken", tokenAddress);
        await token.mint(owner.address, 1000000);
        console.log(await token.balanceOf(owner.address));
        console.log(`CoinFlip address is : ${game.address}`);
        console.log(`GameToken address is: ${token.address}`);
    
        return { game, token, owner, caller, otherAccount };
    }

    describe("Initialization: ", function() {
        it("Should init with correct args: ", async function () {
            const { game, token, owner, caller, otherAccount } = await loadFixture(deployCoinFlipFixture);
            expect(await game.coeff()).to.equal(ethers.BigNumber.from("195"));
            expect(await game.minDepositAmount()).to.equal(ethers.BigNumber.from("100"));
            const maxDep = 1e18;
            expect(await game.maxDepositAmount()).to.equal(ethers.BigNumber.from(maxDep.toString()));
            expect(await game.token()).to.equal(token.address);
        });
    });

    describe("Setter function: ", function() {
        it("Should change coeff: ", async function() {
            const { game, token, owner, caller, otherAccount } = await loadFixture(deployCoinFlipFixture);
            await game.changeCoeff(ethers.BigNumber.from("120"));
            expect(await game.coeff()).to.equal(ethers.BigNumber.from("120"));
        });

        it("Should change max/min deposit amount: ", async function() {
            const { game, token, owner, caller, otherAccount } = await loadFixture(deployCoinFlipFixture);
            await game.changeMaxMinBet(200, 2000);
            expect(await game.minDepositAmount()).to.equal(ethers.BigNumber.from("200"));
            expect(await game.maxDepositAmount()).to.equal(ethers.BigNumber.from("2000"));
        });
    });

    describe("Setter function requires: ", function() {
        it("Should reverte with message \"CoinFlip: wrong coeff\"", async function() {
            const { game, token, owner, caller, otherAccount } = await loadFixture(deployCoinFlipFixture);
            
            await expect(game.changeCoeff(ethers.BigNumber.from("1")))
                .to
                .be
                .revertedWith("CoinFlip: wrong coeff");
        });

        it("Should reverte with message \"\": ", async function() {
            const { game, token, owner, caller, otherAccount } = await loadFixture(deployCoinFlipFixture);
            const min = ethers.BigNumber.from("10000000");
            const max = ethers.BigNumber.from("1");
            await expect(game.changeMaxMinBet(min, max))
                .to
                .be
                .revertedWith("CoinFlip: Wrong dep amount!");
        });
    });

    describe("Function play: ", function() {

        it("Should create game win game with correct args: ", async function() {
            const { game, token, owner, caller, otherAccount } = await loadFixture(deployCoinFlipFixture);
            await mine(1);
            
            const choice = ethers.BigNumber.from("1");
            const depAmount = ethers.BigNumber.from("1000");
            const contractMintAmount = ethers.BigNumber.from("10000000000000000000000000000000000");
            const callerMintAmount = ethers.BigNumber.from("1000");

            await token.mint(game.address, contractMintAmount);
            await token.mint(caller.address, callerMintAmount);
            await token.connect(caller).approve(game.address, ethers.BigNumber.from("1000"));

            console.log(`Block number is: ${await ethers.provider.getBlockNumber()}`);

            await game.connect(caller).play(depAmount, choice);

            const winGame = await game.games(0);
            const prize = 1000 * 195 / 100;
            expect(winGame.player).to.equal(caller.address);
            expect(winGame.depositAmount).to.equal(1000);
            expect(winGame.choice).to.equal(1);
            expect(winGame.result).to.equal(1);
            expect(winGame.prize).to.equal(prize);
            expect(winGame.status).to.equal(1)

            // console.log(`Game is: ${winGame}`)
        });

        it("Should create game win game with correct args: ", async function() {

        });

        it("Should transfer correct amount when player win: ", async function() {

        });

        it("Should transfer correct amount when player lose: ", async function() {
            const { game, token, owner, caller, otherAccount } = await loadFixture(deployCoinFlipFixture);
            await expect(() => game.play(depAmount, choice))
                .to
                .changeTokenBalances(token, [caller, game], [950, -950]);
        });

        it("Should emit GameFinished event with correct args: ", async function() {

        });

    });

    describe("Withdraw function: ", function () {
        it("Should withdraw with correct args: ", async function() {

        });
    });
});