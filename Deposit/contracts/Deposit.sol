//SPDX-License-Identifier: Unlicense

import "hardhat/console.sol";

pragma solidity 0.8.9;

contract Deposit {

    mapping(address => uint256) public investings;

	address public owner;

    uint256 public contractBalance;

	constructor() payable {
		owner = msg.sender;
		contractBalance += msg.value;
	}

    function invest() payable public {
        investings[msg.sender] = msg.value;
        contractBalance += msg.value;
    }

    function interestRate() private {
        investings[msg.sender] = investings[msg.sender] * 110 / 100;
    }

    function withdraw() payable external {
		require(investings[msg.sender] != 0, "Deposit: error");
        contractBalance -= investings[msg.sender];
		uint256 tempVar = investings[msg.sender]; // local
        interestRate();
		investings[msg.sender] = 0;
        payable(msg.sender).transfer(tempVar);
    }
}
 
