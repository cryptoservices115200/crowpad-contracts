// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/TokenTimelock.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./crowdsale/Crowdsale.sol";
import "./crowdsale/emission/MintedCrowdsale.sol";
import "./crowdsale/validation/CappedCrowdsale.sol";
import "./crowdsale/validation/TimedCrowdsale.sol";
import "./crowdsale/validation/WhitelistCrowdsale.sol";
import "./crowdsale/distribution/RefundableCrowdsale.sol";

contract CrowpadCrowdsale is Crowdsale, MintedCrowdsale, CappedCrowdsale, TimedCrowdsale, WhitelistCrowdsale, RefundableCrowdsale, Ownable {

    // Track investor contributions
    uint256 public investorMinCap = 2000000000000000; // 0.002 ether
    uint256 public investorHardCap = 50000000000000000000; // 50 ether
    mapping(address => uint256) public contributions;

    // Crowdsale Stages
    enum CrowdsaleStage { PreICO, ICO }
    // Default to presale stage
    CrowdsaleStage public stage = CrowdsaleStage.PreICO;

    // Token Distribution
    uint256 public tokenSalePercentage   = 70;
    uint256 public foundersPercentage    = 10;
    uint256 public foundationPercentage  = 10;
    uint256 public partnersPercentage    = 10;

    // Token reserve funds
    address public foundersFund;
    address public foundationFund;
    address public partnersFund;

    // Token time lock
    uint256 public releaseTime;
    address public foundersTimelock;
    address public foundationTimelock;
    address public partnersTimelock;

    constructor(
        uint256 _rate,
        address _wallet,
        IERC20 _token,
        uint256 _cap,
        uint256 _openingTime,
        uint256 _closingTime,
        uint256 _goal,
        address _foundersFund,
        address _foundationFund,
        address _partnersFund,
        uint256 _releaseTime
    )
        Crowdsale(_rate, _wallet, _token)
        CappedCrowdsale(_cap)
        TimedCrowdsale(_openingTime, _closingTime)
        RefundableCrowdsale(_goal)
    {
        require(_goal <= _cap);
        foundersFund   = _foundersFund;
        foundationFund = _foundationFund;
        partnersFund   = _partnersFund;
        releaseTime    = _releaseTime;
    }

    /**
    * @dev Returns the amount contributed so far by a sepecific user.
    * @param _beneficiary Address of contributor
    * @return User contribution so far
    */
    function getUserContribution(address _beneficiary) public view returns (uint256) {
        return contributions[_beneficiary];
    }

    /**
    * @dev Allows admin to update the crowdsale stage
    * @param _stage Crowdsale stage
    */
    function setCrowdsaleStage(uint _stage) public onlyOwner {
        if (uint(CrowdsaleStage.PreICO) == _stage) {
            stage = CrowdsaleStage.PreICO;
        } else if (uint(CrowdsaleStage.ICO) == _stage) {
            stage = CrowdsaleStage.ICO;
        }

        if (stage == CrowdsaleStage.PreICO) {
            rate = 500;
            // change crowsale's rate
        } else if (stage == CrowdsaleStage.ICO) {
            rate = 250;
            // change crowsale's rate
        }
    }

    /**
    * @dev forwards funds to the wallet during the PreICO stage, then the refund vault during ICO stage
    */
    function _forwardFunds() internal override {
        if (stage == CrowdsaleStage.PreICO) {
            wallet.transfer(msg.value);
        } else if (stage == CrowdsaleStage.ICO) {
            super._forwardFunds();
        }
    }

    /**
    * @dev Extend parent behavior requiring purchase to respect investor min/max funding cap.
    * @param _beneficiary Token purchaser
    * @param _weiAmount Amount of wei contributed
    */
    function preValidatePurchase(address _beneficiary, uint256 _weiAmount) internal {
        super._preValidatePurchase(_beneficiary, _weiAmount);
        uint256 _existingContribution = contributions[_beneficiary];
        uint256 _newContribution = _existingContribution.add(_weiAmount);
        require(_newContribution >= investorMinCap && _newContribution <= investorHardCap);
        contributions[_beneficiary] = _newContribution;
    }


    /**
    * @dev enables token transfers, called when owner calls finalize()
    */
    function finalization() internal {
        // if (goalReached()) {
        //     MintableToken _mintableToken = MintableToken(token);
        //     uint256 _alreadyMinted = _mintableToken.totalSupply();

        //     uint256 _finalTotalSupply = _alreadyMinted.div(tokenSalePercentage).mul(100);

        //     foundersTimelock   = new TokenTimelock(token, foundersFund, releaseTime);
        //     foundationTimelock = new TokenTimelock(token, foundationFund, releaseTime);
        //     partnersTimelock   = new TokenTimelock(token, partnersFund, releaseTime);

        //     _mintableToken.mint(address(foundersTimelock),   _finalTotalSupply.mul(foundersPercentage).div(100));
        //     _mintableToken.mint(address(foundationTimelock), _finalTotalSupply.mul(foundationPercentage).div(100));
        //     _mintableToken.mint(address(partnersTimelock),   _finalTotalSupply.mul(partnersPercentage).div(100));

        //     _mintableToken.finishMinting();
        //     // Unpause the token
        //     PausableToken _pausableToken = PausableToken(token);
        //     _pausableToken.unpause();
        //     _pausableToken.transferOwnership(wallet);
        // }

        // super.finalization();
    }

}