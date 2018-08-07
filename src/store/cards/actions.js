import TruffleContract from 'truffle-contract'
import CardsAbi from '@@/build/contracts/Cards.json'
const cardsContract = TruffleContract(CardsAbi)

export default {
  async loadGenesisCard({ commit }) {
    cardsContract.setProvider(this.$web3.currentProvider)

    const instance = await cardsContract.deployed()

    instance.getGenesisCard
      .call()
      .then(card =>
        commit('SET_OWN_CARDS', [{ title: card[0], attack: card[1].toNumber(), defense: card[2].toNumber(), creator: card[3] }])
      )
      .catch(e => console.error('Could not load genesis card', e))
  },
  async createCard(ctx, { title, attack, defense }) {
    cardsContract.setProvider(this.$web3.currentProvider)

    const accounts = await this.$web3.eth.getAccounts()
    const instance = await cardsContract.deployed()

    instance
      .createCard(title, attack, defense, { from: accounts[0] })
      .then(result => {
        const args = result.logs[0].args

        console.log('Transaction processed: ', { totalCards: args.totalCards.toNumber() })
      })
      .catch(e => console.error('Could not create card', e))
  },
}
