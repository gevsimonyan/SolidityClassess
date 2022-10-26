//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IDramToken is IERC20 {
	function mint(address, uint256) external;

	function burn(address, uint256) external;
}