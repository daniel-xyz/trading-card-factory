pragma solidity ^0.4.24;

contract Cards {
	Card[] cards;
	Card genesisCard = Card('Friendly Dragon', 12, 30, address(0), 'QmfSMtT9a1rXWsSDwrUFf2Jnbb41Ec4dwGV5WcAAMPZopB');

	event CreatedCard(string title, address creator, uint totalCards);

	struct Card {
		string title;
		uint8 attack;
		uint8 defense;
		address creator;
		string artwork;
	}
	
	constructor() public {
		cards.push(genesisCard);
	}

	function createCard(string title, uint8 attack, uint8 defense, string artwork) public {
		cards.push(Card(title, attack, defense, msg.sender, artwork));

		emit CreatedCard(title, msg.sender, cards.length);
	}

	// just to test this contract
	function getGenesisCard() public view returns(string, uint8, uint8, address, string) {
		Card storage card = cards[0];

		return (card.title, card.attack, card.defense, card.creator, card.artwork);
	}
}
