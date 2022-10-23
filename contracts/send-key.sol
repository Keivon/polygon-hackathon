// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;          

contract PurchaseKey{
    address owner;
    mapping(string => mapping(address => bool)) public ownKey;
    mapping(address => string[]) public keys;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    modifier doesntOwn(string memory _game, address _customer) {
        require(ownKey[_game][_customer] == false);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function SendKey(string memory _game, address _customer, string memory _key) public onlyOwner doesntOwn(_game, _customer) {
        keys[_customer].push(_key);
        ownKey[_game][_customer] = true;
    }

    function SeeKeys(address _customer) external view returns(string[] memory) {
        return keys[_customer];
    }
}