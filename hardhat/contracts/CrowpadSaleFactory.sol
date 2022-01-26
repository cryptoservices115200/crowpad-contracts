// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CrowpadSale.sol";

contract CrowpadSaleFactory is Ownable {    

    address payable feeAddress;
    uint256 public deployFee = 0.8 ether;

    struct Sale {
        address saleAddress;
        address creatorAddress;
        address walletAddress;
        address token;
        uint256 rate;
        uint256 goal;
        uint256 created;
    }

    Sale[] sales;

    mapping(address => uint256) creatorSaleCount;
    mapping(address => address) saleToCreator;

    event NewSaleCreated(address from, address wallet, address deployed);

    constructor(address payable _feeAddress) {
        feeAddress = _feeAddress;
	}

    function setDeployFee(uint256 _newDeployFee) external onlyOwner {
        deployFee = _newDeployFee;
    }

    /**
    * @notice Set address in which fee is stored
    * @param _newAddress new address
    * @dev
    */
    function setFeeAddress(address payable _newAddress) external onlyOwner {
        feeAddress = _newAddress;
    }

    /**
    * @notice Create new sale
    * @param _rate token name
    * @param _wallet token symbol
    * @param _token The number of decimals used in token
    * @param _cap Initial supply of token
    * @param _openingTime ...
    * @param _closingTime ...
    * @param _goal ...
    * @param _foundersFund ...
    * @param _foundationFund ...
    * @param _partnersFund ...
    * @param _releaseTime ...
    * @dev
    */
    function createSale(
        uint256 _rate,
        address payable _wallet,
        IERC20 _token,
        uint256 _cap,
        uint256 _openingTime,
        uint256 _closingTime,
        uint256 _goal,
        address _foundersFund,
        address _foundationFund,
        address _partnersFund,
        uint256 _releaseTime
    ) public payable {
        require(msg.value >= deployFee, 'Insufficient funds sent for deploy');
        CrowpadSale newSale = new CrowpadSale(_rate, _wallet, _token, _cap, _openingTime, _closingTime, _goal, _foundersFund, _foundationFund, _partnersFund, _releaseTime);

        address saleAddress = address(newSale);

        sales.push(Sale(saleAddress, msg.sender, _wallet, address(_token), _rate, _goal, block.timestamp));
        creatorSaleCount[msg.sender]++;
        saleToCreator[saleAddress] = msg.sender;

        emit NewSaleCreated(msg.sender, _wallet, saleAddress);
    }

	/**
	* @notice Withdraw fee
    * @dev
    */
    function withdrawFee() external onlyOwner {
        feeAddress.transfer(address(this).balance);
    }

    /**
    * @notice Get all sales deployed on network
    * @dev
    */
    function getAllSales() external view returns (Sale[] memory) {
        return sales;
    }

    /**
    * @notice Get all sales of given user
    * @param _user user address
    * @dev
    */
    function getUserSales(address _user) external view returns (Sale[] memory) {
        Sale[] memory result = new Sale[](creatorSaleCount[_user]);
        uint counter = 0;

        for (uint i = 0; i < sales.length; i++) {
            if (saleToCreator[sales[i].creatorAddress] == _user) {
                result[counter] = sales[i];
                counter++;
            }
        }
        return result;
    }
}
