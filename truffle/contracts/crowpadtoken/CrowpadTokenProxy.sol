// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
import "./CrowpadTokenStorage.sol";

interface IUniswapV2Factory {
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
    function feeTo() external view returns (address);
    function feeToSetter() external view returns (address);
    function getPair(address tokenA, address tokenB) external view returns (address pair);
    function allPairs(uint) external view returns (address pair);
    function allPairsLength() external view returns (uint);
    function createPair(address tokenA, address tokenB) external returns (address pair);
    function setFeeTo(address) external;
    function setFeeToSetter(address) external;
}

contract CrowpadTokenProxy is CrowpadTokenStorage {

    event MinTokensBeforeSwapUpdated(uint256 minTokensBeforeSwap);
    event Upgraded(address indexed implementation);
    
    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 _supply,
        uint256 _txFee,
        uint256 _lpFee,
        uint256 _DexFee,
        address routerAddress,
        address feeaddress,
        address tokenOwner
    )
        CrowpadTokenStorage(name_, symbol_) payable
    {
        _decimals = decimals_;
        _tTotal = _supply * 10 ** _decimals;
        _rTotal = (MAX - (MAX % _tTotal));
        _taxFee = _txFee;
        _liquidityFee = _lpFee;
        _previousTaxFee = _txFee;
		
        _devFee = _DexFee;
        _previousDevFee = _devFee;
        _previousLiquidityFee = _lpFee;
        _maxTxAmount = (_tTotal * 5 / 1000) * 10 ** _decimals;
        numTokensSellToAddToLiquidity = (_tTotal * 5 / 10000) * 10 ** _decimals;
        _devWalletAddress = feeaddress;
        
        _rOwned[tokenOwner] = _rTotal;
        
        IUniswapV2Router02 _uniswapV2Router = IUniswapV2Router02(routerAddress);
         // Create a uniswap/PCS pair for this new token
        uniswapV2Pair = IUniswapV2Factory(_uniswapV2Router.factory())
            .createPair(address(this), _uniswapV2Router.WETH());

        // set the rest of the contract variables
        uniswapV2Router = _uniswapV2Router;
        
        //exclude owner and this contract from fee
        _isExcludedFromFee[tokenOwner] = true;
        _isExcludedFromFee[address(this)] = true;
        
        emit Transfer(address(0), tokenOwner, _tTotal);		
    }

  /**
   * @dev Set new logic contract address.
   */
  function setImplementation(address _implementation) external onlyOwner {
    require(_implementation != address(0), 'implementation must be valid');
    require(_implementation != implementation, 'already this implementation');

    implementation = _implementation;

    emit Upgraded(_implementation);
  }

  /**
    * @dev Fallback function allowing to perform a delegatecall 
    * to the given implementation. This function will return 
    * whatever the implementation call returns
    */
  fallback () external payable {
      address impl = implementation;
      require(impl != address(0), 'implementation not set');
      assembly {
          let ptr := mload(0x40)
          calldatacopy(ptr, 0, calldatasize())
          let result := delegatecall(gas(), impl, ptr, calldatasize(), 0, 0)
          let size := returndatasize()
          returndatacopy(ptr, 0, size)
          
          switch result
          case 0 { revert(ptr, size) }
          default { return(ptr, size) }
      }
  }

  //to recieve ETH from uniswapV2Router when swaping
  receive() external payable {}
}