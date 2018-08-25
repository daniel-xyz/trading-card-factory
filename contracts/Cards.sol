pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract Cards {
	using SafeMath for uint;

	Card[] cards;
	mapping(address => Card[]) cardsOwned;
	mapping(address => uint) public openRewardsInWei;

	event CreatedCard(bytes32 title, address creator, uint totalCards);
	event BoughtCard(bytes32 title, address byAddress);
	event ClaimedRewards(address receiver, uint weiLeftInContract, uint amount);

	struct Card {
		bytes32 title;
		uint8 attack;
		uint8 defense;
		address creator;
		bytes32 artwork;
		uint weiPrice;
	}
	
	constructor() public {
		createCard('Friendly Dragon', 12, 30, 0xfe0d246ece96ef9c6c317f4b76c7dd9be4be585c2f8f743d47d9de07a2e207c8);
		createCard('Unhappy Dragon', 43, 9, 0xfe0d246ece96ef9c6c317f4b76c7dd9be4be585c2f8f743d47d9de07a2e207c8);
	}

	function createCard(bytes32 _title, uint8 _attack, uint8 _defense, bytes32 _artwork) public {
		uint calculatedPrice = getCalculatedPriceInWei(_attack, _defense);

		cards.push(Card(_title, _attack, _defense, msg.sender, _artwork, calculatedPrice));

		emit CreatedCard(_title, msg.sender, cards.length);
	}

	function getCards() public view returns(uint[], bytes32[], uint8[], uint8[], bytes32[], uint[]) {
		return mapCardsToArraysTuple(cards);
	}

	function getCardsOwned() public view returns(uint[], bytes32[], uint8[], uint8[], bytes32[], uint[]) {
		return mapCardsToArraysTuple(cardsOwned[msg.sender]);
	}

	function mapCardsToArraysTuple(Card[] _cards) internal pure returns(uint[], bytes32[], uint8[], uint8[], bytes32[], uint[]) {
		uint cardsCount = _cards.length;
		
		uint[] memory ids = new uint[](cardsCount);
		bytes32[] memory titles = new bytes32[](cardsCount);
		uint8[] memory attacks = new uint8[](cardsCount);
		uint8[] memory defenses = new uint8[](cardsCount);
		bytes32[] memory artworks = new bytes32[](cardsCount);
		uint[] memory weiPrices = new uint[](cardsCount);

		for (uint i = 0; i < cardsCount; i++) {
			ids[i] = i;
			titles[i] = _cards[i].title;
			attacks[i] = _cards[i].attack;
			defenses[i] = _cards[i].defense;
			artworks[i] = _cards[i].artwork;
			weiPrices[i] = _cards[i].weiPrice;
		}

		return (ids, titles, attacks, defenses, artworks, weiPrices);
	}

	function getGenesisCard() public view returns(bytes32, uint8, uint8, address, bytes32, uint) {
		Card storage card = cards[0];

		return (card.title, card.attack, card.defense, card.creator, card.artwork, card.weiPrice);
	}

	function buyCard(uint _id) payable public {
        Card storage card = cards[_id];

        require(msg.value == card.weiPrice, "You've not sent enough or too much ETH.");

		cardsOwned[msg.sender].push(card);
		openRewardsInWei[card.creator] = openRewardsInWei[card.creator].add(card.weiPrice);

		emit BoughtCard(card.title, msg.sender);
	}

	function claimRewards() public {
		uint amount = openRewardsInWei[msg.sender];

		require(amount > 0);
		require(address(this).balance >= amount, "Not enough balance in contract."); // TODO - enter failsafe

		openRewardsInWei[msg.sender] = 0;

		msg.sender.transfer(amount);
		
		emit ClaimedRewards(msg.sender, address(this).balance, amount);
	}

	function getCalculatedPriceInWei(uint8 _multiplierA, uint8 _multiplierB) private pure returns(uint price) {
		uint baseMultiplier = 1000000000000000;
		uint multiplierA = 1;
		uint multiplierB = 1;

		if (_multiplierA > 0) multiplierA = _multiplierA;
		if (_multiplierB > 0) multiplierB = _multiplierB;

		price = baseMultiplier.mul(multiplierA).mul(multiplierB);

		if (price < baseMultiplier) price = baseMultiplier;
	}
}
