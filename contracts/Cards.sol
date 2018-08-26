pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract Cards {
	using SafeMath for uint;

	address private owner;
	bool private isEmergencyMode = false;
	Card[] private cards;
	mapping(address => Card[]) private cardsOwned;
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

    /** @dev Reverts any call that is not made by the contract's owner. */
	modifier isOwner() {
		require(owner == msg.sender);
		_;
	}

    /** @dev Reverts any call that is made during the emergency mode. */
	modifier stopInEmergency { 
		require(!isEmergencyMode);
		_;
	 }

    /** @dev Reverts any call that is not made during the emergency mode. */
	modifier onlyInEmergency {
		require(isEmergencyMode);
		_;
	}
	
    /** @dev Sets the `owner` state variable the sender's address and creates to default cards. */
	constructor() public {
		owner = msg.sender;

		createCard('Friendly Dragon', 12, 30, 0xfe0d246ece96ef9c6c317f4b76c7dd9be4be585c2f8f743d47d9de07a2e207c8);
		createCard('Unhappy Dragon', 43, 9, 0xfe0d246ece96ef9c6c317f4b76c7dd9be4be585c2f8f743d47d9de07a2e207c8);
	}

    /** @dev Sets the `isEmergencyMode` state variable to `false`. */
	function stopEmergencyMode() public isOwner onlyInEmergency {
		isEmergencyMode = false;
	}

    /** @dev Sets the `isEmergencyMode` state variable to `true`. */
	function startEmergencyMode() private {
		isEmergencyMode = true;
	}

    /** @dev Creates a new trading card and saves it in the storage.
      * @param _title Card title.
      * @param _attack Attack value.
      * @param _defense Defense value.
      * @param _artwork IPFS hash encoded as hex string, representing the card artwork.
      */
	function createCard(bytes32 _title, uint8 _attack, uint8 _defense, bytes32 _artwork) public stopInEmergency {
		uint calculatedPrice = getCalculatedPriceInWei(_attack, _defense);

		cards.push(Card(_title, _attack, _defense, msg.sender, _artwork, calculatedPrice));

		emit CreatedCard(_title, msg.sender, cards.length);
	}

    /** @dev Returns all cards that exist in the storage as arrays of their values.
      * @return ids Array of card id's.
      * @return titles Array of card titles.
      * @return attacks Array of card attacks.
      * @return defenses Array of card defenses.
      * @return artworks Array of card artwork IPFS hashes encoded in hex strings.
      * @return weiPrices Array of card prices in wei.
      */
	function getCards() public view returns(uint[], bytes32[], uint8[], uint8[], bytes32[], uint[]) {
		return mapCardsToArraysTuple(cards);
	}

    /** @dev Returns all cards that are owned by the sender as arrays of their values.
      * @return ids Array of card id's.
      * @return titles Array of card titles.
      * @return attacks Array of card attacks.
      * @return defenses Array of card defenses.
      * @return artworks Array of card artwork IPFS hashes encoded in hex strings.
      * @return weiPrices Array of card prices in wei.
      */
	function getCardsOwned() public view returns(uint[], bytes32[], uint8[], uint8[], bytes32[], uint[]) {
		return mapCardsToArraysTuple(cardsOwned[msg.sender]);
	}

    /** @dev Returns a tuple that contains arrays for all values of cards passed in.
      * @param _cards Array of struct type `Card`.
      * @return ids Array of card id's.
      * @return titles Array of card titles.
      * @return attacks Array of card attacks.
      * @return defenses Array of card defenses.
      * @return artworks Array of card artwork IPFS hashes encoded in hex strings.
      * @return weiPrices Array of card prices in wei.
      */
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

    /** @dev Adds a card with given id to the cards that the sender owns.
      * @param _id ID of a card.
      */
	function buyCard(uint _id) payable public stopInEmergency {
        Card storage card = cards[_id];

        require(msg.value == card.weiPrice, "You've not sent enough or too much ETH.");

		cardsOwned[msg.sender].push(card);
		openRewardsInWei[card.creator] = openRewardsInWei[card.creator].add(card.weiPrice);

		emit BoughtCard(card.title, msg.sender);
	}

    /** @dev Transfers all rewards to the sender's address that have been collected for it. */
	function claimRewards() public {
		uint amount = openRewardsInWei[msg.sender];

		require(amount > 0);

		if (address(this).balance < amount) {
			startEmergencyMode();

			revert("This contract does not hold enough ETH. Seems like something went wrong badly. The contract will now enter the emergency mode - claiming rewards might still be possible.");
		}

		openRewardsInWei[msg.sender] = 0;

		msg.sender.transfer(amount);
		
		emit ClaimedRewards(msg.sender, address(this).balance, amount);
	}

    /** @dev Returns a price denominated in wei that is calculated based on the given multipliers.
      * @param _multiplierA The first multiplier, e.g. the card's attack value.
      * @param _multiplierB The second multiplier, e.g. the card's defense value.
      * @return price The calculated price in wei.
      */
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
