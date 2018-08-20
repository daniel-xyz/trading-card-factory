import TruffleContract from 'truffle-contract'
import CardsAbi from '@@/build/contracts/Cards.json'
import { getBytes32FromIpfsHash } from '@/utils/ipfs'

let cardsContract, instance, accounts

async function prepare() {
  cardsContract = TruffleContract(CardsAbi)

  cardsContract.setProvider(this.$web3.currentProvider)

  accounts = await this.$web3.eth.getAccounts()
  instance = await cardsContract.deployed()
}

export default {
  async loadGenesisCard({ commit }) {
    await prepare.call(this)

    instance.getGenesisCard
      .call()
      .then(values => commit('SET_OWN_CARDS', values))
      .catch(e => console.error('Could not load genesis card', e))
  },
  async createCard(ctx, { title, attack, defense, artwork }) {
    await prepare.call(this)

    instance
      .createCard(title, attack, defense, getBytes32FromIpfsHash(artwork), { from: accounts[0] })
      .then(result => {
        const args = result.logs[0].args

        console.log('Transaction processed: ', { totalCards: args.totalCards.toNumber() })
      })
      .catch(e => console.error('Could not create card', e))
  },
  async loadCards({ commit }) {
    await prepare.call(this)

    instance.getCards
      .call()
      .then(values => commit('SET_ALL_CARDS', values))
      .catch(e => console.error('Could not load cards', e))
  },
  async buyCard(ctx, { id, weiPrice }) {
    await prepare.call(this)

    instance
      .buyCard(id, { from: accounts[0], value: weiPrice })
      .then(result => {
        const args = result.logs[0].args

        console.log('Transaction processed: ', { title: args.title })
      })
      .catch(e => console.error('Could not buy card', e))
  },
}
