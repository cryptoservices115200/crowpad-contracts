// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./crowdsale/Crowdsale.sol";

contract CrowpadCrowdsale is Crowdsale {

    constructor(
        uint256 _rate,
        address payable _wallet,
        ERC20 _token
    ) Crowdsale(_rate, _wallet, _token) {

    }
}