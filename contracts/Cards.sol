pragma solidity ^0.4.24;

contract Cards {
	Card[] cards;

	event CreatedCard(string title, address creator);

	struct Card {
		string title;
		uint8 attack;
		uint8 defense;
		address creator;
	}

	constructor() public {
		cards.push(Card('Friendly Dragon', 12, 30, address(0)));
	}

	function createCard(string title, uint8 attack, uint8 defense) public {
		cards.push(Card(title, attack, defense, msg.sender));

		emit CreatedCard(title, msg.sender);
	}

	// just to test this contract
	function getRandomCard() public view returns(string title, uint8 attack, uint8 defense, address creator) {
		Card storage card = cards[1];

		return (card.title, card.attack, card.defense, card.creator);
	}
}
