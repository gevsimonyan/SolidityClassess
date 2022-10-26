// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

contract SimpleContract {

    mapping (address => uint256) public balances;
    uint256 public totalAmount; // 0

    function deposit() public payable {
        // msg.sender; // address
        // msg.value; // wei amount
        balances[msg.sender] += msg.value;
        totalAmount += msg.value;
    }

    function withdraw() public {
        uint256 transferAmount = balances[msg.sender];
        balances[msg.sender] = 0;
        totalAmount -= transferAmount;
        payable(msg.sender).transfer(transferAmount);
    }

    function withdraw(uint256 withdrawAmount) public {
        require(balances[msg.sender] >= withdrawAmount, "SimpleContract: not enough funds");
        balances[msg.sender] -= withdrawAmount;
        totalAmount -= withdrawAmount;
        payable(msg.sender).transfer(withdrawAmount);
        // require(false, "message"); // revert
        // require(true || false, ""); // assert      
    }
}

