pragma solidity ^0.4.24;

contract Cards {
	Card[] public cards;
	Card genesisCard = Card('Friendly Dragon', 12, 30, address(0), 0xfe0d246ece96ef9c6c317f4b76c7dd9be4be585c2f8f743d47d9de07a2e207c8);
	Card secondCard = Card('Unhappy Dragon', 43, 9, address(0), 0xfe0d246ece96ef9c6c317f4b76c7dd9be4be585c2f8f743d47d9de07a2e207c8);
	mapping(address => Card[]) cardsOwned;

	event CreatedCard(bytes32 title, address creator, uint totalCards);
	event BoughtCard(bytes32 title);

	struct Card {
		bytes32 title;
		uint8 attack;
		uint8 defense;
		address creator;
		bytes32 artwork;
	}
	
	constructor() public {
		cards.push(genesisCard);
		cards.push(secondCard);
	}

	function createCard(bytes32 _title, uint8 _attack, uint8 _defense, bytes32 _artwork) public {
		cards.push(Card(_title, _attack, _defense, msg.sender, _artwork));

		emit CreatedCard(_title, msg.sender, cards.length);
	}

	function getCards() public view returns(bytes32[], uint8[], uint8[], address[], bytes32[]) {
		uint cardsCount = cards.length;

		bytes32[] memory titles = new bytes32[](cardsCount);
		uint8[] memory attacks = new uint8[](cardsCount);
		uint8[] memory defenses = new uint8[](cardsCount);
		address[] memory creators = new address[](cardsCount);
		bytes32[] memory artworks = new bytes32[](cardsCount);

		for (uint i = 0; i < cardsCount; i++) {
			titles[i] = cards[i].title;
			attacks[i] = cards[i].attack;
			defenses[i] = cards[i].defense;
			creators[i] = cards[i].creator;
			artworks[i] = cards[i].artwork;
		}

		return (titles, attacks, defenses, creators, artworks);
	}

	function getGenesisCard() public view returns(bytes32, uint8, uint8, address, bytes32) {
		Card storage card = cards[0];

		return (card.title, card.attack, card.defense, card.creator, card.artwork);
	}

	function buyCard(uint _id) public {
		Card storage card = cards[_id];

		cardsOwned[msg.sender].push(card);

		emit BoughtCard(card.title);
	}
}
