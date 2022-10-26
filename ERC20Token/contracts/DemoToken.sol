// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract DemoToken {

	mapping (address => uint256) private _balances;
	mapping (address => mapping(address => uint256)) _allowances;
	// user -> user -> amount

	string private _name;
	string private _symbol;
	uint256 private _totalSupply;
	uint8 private _decimals;
	address public owner;

	constructor(string memory name, string memory symbol) {
		_name = name;
		_symbol = symbol;
		owner = msg.sender;
	}

	function name() public view returns (string) {
		return _name;
	}

	function symbol() public view returns (string) {
		return _symbol;
	}

	function totalSupply() public view returns (uint256) {
		return _totalSupply;
	}

	function decimals() public view returns (uint8) {
		return _decimals;
	}

	function balanceOf(address _owner) public view returns (uint256) {
		return _balances[_owner];
	}

	function allowance(address _owner, address _spender) public view returns (uint256) {
		return _allowances[_owner][_spender];
	}

	function transfer(address _to, uint256 _amount) public returns(bool) {
		require(_balances[msg.sender] >= _amount, "DemoToken: Not enough funds");
		_balances[msg.sender] = _balances[msg.sender] - _amount;
		_balances[_to] +=  _amount
		return true;
	}

	function approve(address _spender, uint256 _amount) public returns(bool) {
		require(_balances[msg.sender] >= _amount, "DemoToken: Error");
		require(_spender != address(0), "Error");
		_allowances[msg.sender][_spender] += _amount;
		return true;
	}

	function decreaseAllowance(address _spender, uint256 _amount) public returns(bool) {
		require(_allowances[msg.sender][_spender] >= _amount, "DemoToken: Error");
		require(_spender != address(0), "Error");
		_allowances[msg.sender][_spender] -= _amount;
		return true;
	}

	function transferFrom(address _from, address _to, uint256 _amount) public returns(bool) {
		require(_allowances[_from][_to] >= _amount, "DemoToken: Error");
		require(_balances[_from] >= _amount, "DemoToken: Error");
		_allowances[_from][_to] -= _amount;
		_balances[_from] -= _amount;
		_balances[_to] += _amount;
		return true;
	}

	function mint(address _to, uint256 _amount) public returns (bool) {
		require(msg.sender == owner, "DemoToken: Only owner");
		_balances[_to] += _amount;
		return true;
	}

	function burn(address _to, uint256 _amount) public returns (bool) {
		require(msg.sender == owner, "DemoToken: Only owner");
		if (_amount > _balances[_to]) {
			_balances[_to] = 0;
			return true;
		}

		_balances[_to] -= _amount;
		return true;
	}
}

