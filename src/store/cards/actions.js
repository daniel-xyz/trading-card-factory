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

        this.$toast.show(`Successfully created ${this.$web3.utils.toAscii(args.title)}`, { type: 'success' })
      })
      .catch(() => this.$toast.show(`Couldn't create card. Maybe try again with a higher Gas Limit.`, { type: 'error' }))
  },
  async loadCards({ commit }) {
    await prepare.call(this)

    instance.getCards
      .call({ from: accounts[0] })
      .then(values => commit('SET_ALL_CARDS', values))
      .catch(() => this.$toast.show(`Couldn't load cards.`, { type: 'error' }))
  },
  async loadCardsOwned({ commit }) {
    await prepare.call(this)

    instance.getCardsOwned
      .call({ from: accounts[0] })
      .then(values => commit('SET_OWN_CARDS', values))
      .catch(() => this.$toast.show(`Couldn't load cards.`, { type: 'error' }))
  },
  async loadOpenRewards({ commit }) {
    await prepare.call(this)

    instance.openRewardsInWei
      .call(accounts[0], { from: accounts[0] })
      .then(wei => commit('SET_OPEN_REWARDS', wei))
      .catch(() => this.$toast.show(`Couldn't load open rewards.`, { type: 'error' }))
  },
  async buyCard(ctx, { id, weiPrice }) {
    await prepare.call(this)

    instance
      .buyCard(id, { from: accounts[0], value: weiPrice })
      .then(result => {
        console.log(result)
        const args = result.logs[0].args

        window.setTimeout(() => this.dispatch('loadCardsOwned'), 10000)

        this.$toast.show(`Successfully bought ${this.$web3.utils.toAscii(args.title)}`, { type: 'success' })
      })
      .catch(() => this.$toast.show(`Couldn't buy card. Maybe you haven't enough ETH?`, { type: 'error' }))
  },
  async claimRewards() {
    await prepare.call(this)

    instance
      .claimRewards({ from: accounts[0] })
      .then(result => {
        const args = result.logs[0].args

        window.setTimeout(() => this.dispatch('loadOpenRewards'), 10000)

        this.$toast.show(`Successfully claimed Ξ ${this.$web3.utils.fromWei(this.$web3.utils.toBN(args.amount), 'ether')}`, {
          type: 'success',
        })
      })
      .catch(() => this.$toast.show('Could not claim rewards. Maybe try again with a higher Gas Limit.', { type: 'error' }))
  },
}
