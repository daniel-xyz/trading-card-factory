pragma solidity ^0.4.24;

contract Cards {
	Card[] cards;
	Card genesisCard = Card('Friendly Dragon', 12, 30, address(0));

	event CreatedCard(string title, address creator);

	struct Card {
		string title;
		uint8 attack;
		uint8 defense;
		address creator;
	}
	
	constructor() public {
		cards.push(genesisCard);
	}

	function createCard(string title, uint8 attack, uint8 defense) public {
		cards.push(Card(title, attack, defense, msg.sender));

		emit CreatedCard(title, msg.sender);
	}

	// just to test this contract
	function getGenesisCard() public view returns(string, uint8, uint8, address) {
		Card storage card = cards[0];

		return (card.title, card.attack, card.defense, card.creator);
	}
}
