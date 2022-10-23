// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;    

import "./lib/GenesisUtils.sol";
import "./interfaces/ICircuitValidator.sol";
import "./verifiers/ZKPVerifier.sol";

contract PurchaseKey{
    address owner;
    mapping(string => mapping(address => bool)) public ownKey;
    mapping(address => string[]) public keys;

    uint64 public constant TRANSFER_REQUEST_ID = 1;

    mapping(uint256 => address) public idToAddress;
    mapping(address => uint256) public addressToId;

    uint256 public TOKEN_AMOUNT_FOR_AIRDROP_PER_ID = 5 * 10**uint(decimals());

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

    function _beforeProofSubmit(
        uint64, /* requestId */
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal view override {
        // check that challenge input of the proof is equal to the msg.sender 
        address addr = GenesisUtils.int256ToAddress(
            inputs[validator.getChallengeInputIndex()]
        );
        require(
            _msgSender() == addr,
            "address in proof is not a sender address"
        );
    }

    function _afterProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal override {
        require(
            requestId == TRANSFER_REQUEST_ID && addressToId[_msgSender()] == 0,
            "proof can not be submitted more than once"
        );

        uint256 id = inputs[validator.getChallengeInputIndex()];
        keys[_customer].push(_key);
        ownKey[_game][_customer] = true;
    }

    function _beforeTokenTransfer(
        address, /* from */
        address to,
        uint256 /* amount */
    ) internal view override {
        require(
            proofs[to][TRANSFER_REQUEST_ID] == true,
            "only identities who provided proof are allowed to receive tokens"
        );
    }

    // function SendKey(string memory _game, address _customer, string memory _key) public onlyOwner doesntOwn(_game, _customer) {
    //     keys[_customer].push(_key);
    //     ownKey[_game][_customer] = true;
    // }

    function SeeKeys(address _customer) external view returns(string[] memory) {
        return keys[_customer];
    }
}