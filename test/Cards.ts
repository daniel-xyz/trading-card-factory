import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { stringToHex } from "viem";

describe("Cards Contract", function () {
  async function deployCardsFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();
    const cards = await hre.viem.deployContract("Cards", [
      owner.account.address,
    ]);

    return { cards, owner, otherAccount }; // Ensure this object structure matches your contract and test requirements
  }

  describe("Card Creation", function () {
    it("should create a card", async function () {
      const { cards } = await loadFixture(deployCardsFixture);
      const title = stringToHex("My Card", { size: 32 });
      const attack = 50;
      const defense = 50;
      const artwork = stringToHex("ipfs://hash", { size: 32 });

      await cards.write.createCard([title, attack, defense, artwork]);

      // TODO - check that the card was created
    });

    it("should emit CardCreated events with incremental cardId", async function () {
      const { cards } = await loadFixture(deployCardsFixture);
      const title = stringToHex("My Card", { size: 32 });
      const attack = 50;
      const defense = 50;
      const artwork = stringToHex("ipfs://hash", { size: 32 });

      await cards.write.createCard([title, attack, defense, artwork]);
      const events1 = await cards.getEvents.CardCreated();

      expect(events1[0].args.cardId).to.equal(1n);

      await cards.write.createCard([title, attack, defense, artwork]);
      const events2 = await cards.getEvents.CardCreated();

      expect(events2[0].args.cardId).to.equal(2n);
    });

    it("should fail if the title is empty", async function () {
      const { cards } = await loadFixture(deployCardsFixture);

      const title = stringToHex("", { size: 32 });
      const artwork = stringToHex("ipfs://hash", { size: 32 });

      await expect(
        cards.write.createCard([title, 50, 50, artwork])
      ).to.be.rejectedWith("'title' cannot be empty");
    });
  });
});