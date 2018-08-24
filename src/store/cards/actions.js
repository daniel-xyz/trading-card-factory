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
  async createCard(ctx, { title, attack, defense, artwork }) {
    await prepare.call(this)

    instance
      .createCard(title, attack, defense, getBytes32FromIpfsHash(artwork), { from: accounts[0] })
      .then(result => {
        const args = result.logs[0].args

        window.setTimeout(() => this.dispatch('loadCards'), 10000)

        console.log('Transaction processed: ', { totalCards: args.totalCards.toNumber() })
      })
      .catch(e => console.error('Could not create card', e))
  },
  async loadCards({ commit }) {
    await prepare.call(this)

    instance.getCards
      .call({ from: accounts[0] })
      .then(values => commit('SET_ALL_CARDS', values))
      .catch(e => console.error('Could not load cards', e))
  },
  async loadCardsOwned({ commit }) {
    await prepare.call(this)

    instance.getCardsOwned
      .call({ from: accounts[0] })
      .then(values => commit('SET_OWN_CARDS', values))
      .catch(e => console.error('Could not load cards owned', e))
  },
  async buyCard(ctx, { id, weiPrice }) {
    await prepare.call(this)

    instance
      .buyCard(id, { from: accounts[0], value: weiPrice })
      .then(result => {
        const args = result.logs[0].args

        window.setTimeout(() => this.dispatch('loadCardsOwned'), 10000)

        console.log('Transaction processed: ', { id: args.id.toNumber(), byAddress: args.byAddress })
      })
      .catch(e => console.error('Could not buy card', e))
  },
  async claimRewards() {
    await prepare.call(this)

    instance
      .claimRewards({ from: accounts[0] })
      .then(() => console.log('Claimed rewards for address ' + accounts[0]))
      .catch(e => console.error('Could not claim rewards', e))
  },
}
