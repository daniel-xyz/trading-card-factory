import TruffleContract from 'truffle-contract'
import CardsAbi from '@@/build/contracts/Cards.json'
import { getBytes32FromIpfsHash } from '@/utils/ipfs'

const cardsContract = TruffleContract(CardsAbi)

export default {
  async loadGenesisCard({ commit }) {
    cardsContract.setProvider(this.$web3.currentProvider)

    const instance = await cardsContract.deployed()

    instance.getGenesisCard
      .call()
      .then(values => commit('SET_OWN_CARDS', values))
      .catch(e => console.error('Could not load genesis card', e))
  },
  async createCard(ctx, { title, attack, defense, artwork }) {
    cardsContract.setProvider(this.$web3.currentProvider)

    const accounts = await this.$web3.eth.getAccounts()
    const instance = await cardsContract.deployed()

    instance
      .createCard(title, attack, defense, getBytes32FromIpfsHash(artwork), { from: accounts[0] })
      .then(result => {
        const args = result.logs[0].args

        console.log('Transaction processed: ', { totalCards: args.totalCards.toNumber() })
      })
      .catch(e => console.error('Could not create card', e))
  },
  async loadCards({ commit }) {
    cardsContract.setProvider(this.$web3.currentProvider)

    const instance = await cardsContract.deployed()

    instance.getCards
      .call()
      .then(values => commit('SET_ALL_CARDS', values))
      .catch(e => console.error('Could not load cards', e))
  },
}
