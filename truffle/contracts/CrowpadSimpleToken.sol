// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract CrowpadSimpleToken is Ownable {
    using Address for address;
    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) private _allowances;
    address _owner;
    string private _name;
    string private _symbol;
    uint256 private _decimals = 18;
    uint256 private _totalSupply;

    constructor (string memory _NAME, string memory _SYMBOL, uint256 _DECIMALS, uint256 _supply,address routerAddress,address tokenOwner) payable {
        _name = _NAME;
        _symbol = _SYMBOL;
        _decimals = _DECIMALS;
        _totalSupply = _supply * 10 ** _decimals;
        //exclude owner and this contract from fee
        _owner = tokenOwner;
        _balances[_owner] = _totalSupply;
        emit Transfer(address(0),_owner,_totalSupply);

    }
}
