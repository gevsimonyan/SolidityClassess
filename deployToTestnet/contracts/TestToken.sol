// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestToken is ERC20, Ownable {
    constructor() ERC20("Test Token", "TT") {
        _mint(msg.sender, 3000000 ether);
    }

    function mint(address _account, uint256 _amount) public {
        _mint(_account, _amount);
    }

    function burn(address _account, uint256 _amount) external {
        _burn(_account, _amount);
    }

    function buy() external payable {
        mint(msg.sender, msg.value);
		emit Transfer(address(this), msg.sender, msg.value);
    }
}
