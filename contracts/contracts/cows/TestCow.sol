pragma solidity ^0.4.23;

import "../CoinCowCore.sol";
import "./CowBase.sol";

contract TestCow is CowBase {
    string myName;
    string myProfitUnit;
    string myContractType;
    string myContractUnit;

    constructor(address coreAddress, string name, string profitUnit, string contractType, string contractUnit) public CowBase(coreAddress) {
        myName = name;
        myProfitUnit = profitUnit;
        myContractType = contractType;
        myContractUnit = contractUnit;
    }

    function implementsCow() public pure returns (bool) {
        return true;
    }

    function enabled() public view returns (bool) {
        return true;
    }

    function coinCowAddress() public view returns (address) {
        return nonFungibleContract;
    }

    function name() public view returns (string) {
        return myName;
    }

    function profitUnit() public view returns (string) {
        return myProfitUnit;
    }

    function contractType() public view returns (string) {
        return myContractType;
    }

    function contractUnit() public view returns (string) {
        return myContractUnit;
    }

    function milkThreshold() public view returns (uint256) {
        return 15 ether;
    }

    function spillThreshold() public view returns (uint256) {
        return 45 ether;
    }

    function stealThreshold() public view returns (uint256) {
        return 60 ether;
    }

    function milkAvailable(uint256 _tokenId) public view returns (uint256) {
        Cow storage cow = cowIdToCow[_tokenId];
        return 10 ** 18 * (now - cow.lastMilkTime - cow.lastStolen);
    }

    function createCow() public {
        Cow memory cow = Cow(
            true,
            1 ether,
            0,
            uint64(now),
            uint64(now),
            uint64(now + 90 days),
            0,
            0
        );

        CoinCowCore core = CoinCowCore(nonFungibleContract);
        uint256 tokenId = core.createCow();

        cowIdToCow[tokenId] = cow;
        emit CowCreated(tokenId, cow.contractSize);
    }
}

contract TestPowCow is TestCow {
    constructor(address coreAddress) public TestCow(coreAddress, "Test PoW Cow", "TH/s", "POW", "TPOW") {

    }
}

contract TestPosCow is TestCow {
    constructor(address coreAddress) public TestCow(coreAddress, "Test PoS Cow", "TPOS", "POS", "TPOS") {

    }
}

contract TestPlatformCow is TestCow {
    constructor(address coreAddress) public TestCow(coreAddress, "Test Platform Cow", "CCC", "PLATFORM", "CCC") {

    }
}