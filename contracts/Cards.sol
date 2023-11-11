// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Cards is ERC721 {
    uint8 private constant _maxAttackValue = 99;
    uint8 private constant _maxDefenseValue = 99;
    uint256 private _nextCardId = 1;
    mapping(uint256 => Card) private _cards;

    event CardCreated(uint256 indexed cardId, Card cardData);

    struct Card {
        string title;
        uint8 attack;
        uint8 defense;
        address creator;
        string image;
	}

    constructor(address initialOwner)
        ERC721("Card", "CARD")
    {}

    /** @dev Creates a new trading card and saves it in the storage.
      * @param title Card title.
      * @param attack Attack value.
      * @param defense Defense value.
      * @param image IPFS hash encoded as hex string, representing the card image.
      */
	function createCard(string memory title, uint8 attack, uint8 defense, string memory image) public returns (uint256) {
        require(bytes(title).length > 0, "'title' cannot be empty");
        require(bytes(image).length > 0, "'image' cannot be empty");
        require(attack <= _maxAttackValue, "'attack' is too high");
        require(defense <= _maxDefenseValue, "'defense' is too high");

        uint256 newCardId = _nextCardId++;
        _cards[newCardId] = Card(title, attack, defense, msg.sender, image);

        emit CardCreated(newCardId, _cards[newCardId]);

        return newCardId;
	}
}