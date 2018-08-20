pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract Cards {
	using SafeMath for uint;

	Card[] public cards;
	mapping(address => Card[]) cardsOwned;

	event CreatedCard(bytes32 title, address creator, uint totalCards);
	event BoughtCard(bytes32 title);

	struct Card {
		bytes32 title;
		uint8 attack;
		uint8 defense;
		address creator;
		bytes32 artwork;
		uint256 weiPrice;
	}
	
	constructor() public {
		createCard('Friendly Dragon', 12, 30, 0xfe0d246ece96ef9c6c317f4b76c7dd9be4be585c2f8f743d47d9de07a2e207c8);
		createCard('Unhappy Dragon', 43, 9, 0xfe0d246ece96ef9c6c317f4b76c7dd9be4be585c2f8f743d47d9de07a2e207c8);
	}

	function createCard(bytes32 _title, uint8 _attack, uint8 _defense, bytes32 _artwork) public {
		uint256 calculatedPrice = getCalculatedPriceInWei(_attack, _defense);

		cards.push(Card(_title, _attack, _defense, msg.sender, _artwork, calculatedPrice));

		emit CreatedCard(_title, msg.sender, cards.length);
	}

	function getCards() public view returns(uint[], bytes32[], uint8[], uint8[], address[], bytes32[], uint256[]) {
		uint cardsCount = cards.length;

		uint[] memory ids = new uint[](cardsCount);
		bytes32[] memory titles = new bytes32[](cardsCount);
		uint8[] memory attacks = new uint8[](cardsCount);
		uint8[] memory defenses = new uint8[](cardsCount);
		address[] memory creators = new address[](cardsCount);
		bytes32[] memory artworks = new bytes32[](cardsCount);
		uint256[] memory weiPrices = new uint256[](cardsCount);

		for (uint i = 0; i < cardsCount; i++) {
			ids[i] = i;
			titles[i] = cards[i].title;
			attacks[i] = cards[i].attack;
			defenses[i] = cards[i].defense;
			creators[i] = cards[i].creator;
			artworks[i] = cards[i].artwork;
			weiPrices[i] = cards[i].weiPrice;
		}

		return (ids, titles, attacks, defenses, creators, artworks, weiPrices);
	}

	function getGenesisCard() public view returns(bytes32, uint8, uint8, address, bytes32, uint256) {
		Card storage card = cards[0];

		return (card.title, card.attack, card.defense, card.creator, card.artwork, card.weiPrice);
	}

	function buyCard(uint _id) payable public {
        Card storage card = cards[_id];

        require(msg.value < card.weiPrice, "You've sent not enough ETH.");

		cardsOwned[msg.sender].push(card);

		emit BoughtCard(card.title);
	}

	function getCalculatedPriceInWei(uint8 _multiplierA, uint8 _multiplierB) private pure returns(uint256) {
		uint256 baseMultiplier = 1000000000000000;
		uint256 multiplierA = 1;
		uint256 multiplierB = 1;

		if (_multiplierA > 0) multiplierA = _multiplierA;
		if (_multiplierB > 0) multiplierB = _multiplierB;

		uint256 price = baseMultiplier.mul(multiplierA).mul(multiplierB);

		if (price < baseMultiplier) price = baseMultiplier;

		return price;
	}
}
