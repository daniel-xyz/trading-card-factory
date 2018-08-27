/* eslint-disable */
import { transformValueArraysToCards } from '../src/utils/transformations'

var Cards = artifacts.require('./Cards.sol')

contract('Cards', accounts => {
  it('should create the initial cards', async () => {
    const instance = await Cards.deployed()
    const values = await instance.getCards.call()

    const cards = transformValueArraysToCards(values)

    assert.deepEqual(cards[0], {
      id: 0,
      title: 'Friendly Dragon',
      attack: 12,
      defense: 30,
      artwork: 'QmfSMtT9a1rXWsSDwrUFf2Jnbb41Ec4dwGV5WcAAMPZopB',
      weiPrice: web3.toBigNumber(360000000000000000),
    })

    assert.deepEqual(cards[1], {
      id: 1,
      title: 'Unhappy Dragon',
      attack: 43,
      defense: 9,
      artwork: 'QmfSMtT9a1rXWsSDwrUFf2Jnbb41Ec4dwGV5WcAAMPZopB',
      weiPrice: web3.toBigNumber(387000000000000000),
    })
  })

  // it('should create a new card', () => {
  //   return Cards.deployed().then(instance => {
  //     return instance.createCard.call('Pikachu', 2, 3, '0xfe0d246ece96ef9c6c317f4b76c7dd9be4be585c2f8f743d47d9de07a2e207c8', {
  //       from: accounts[0],
  //     })
  //   })
  // })
  // it('should call a function that depends on a linked library', function() {
  //   var meta
  //   var CardsBalance
  //   var CardsEthBalance

  //   return Cards.deployed()
  //     .then(function(instance) {
  //       meta = instance
  //       return meta.getBalance.call(accounts[0])
  //     })
  //     .then(function(outCoinBalance) {
  //       CardsBalance = outCoinBalance.toNumber()
  //       return meta.getBalanceInEth.call(accounts[0])
  //     })
  //     .then(function(outCoinBalanceEth) {
  //       CardsEthBalance = outCoinBalanceEth.toNumber()
  //     })
  //     .then(function() {
  //       assert.equal(CardsEthBalance, 2 * CardsBalance, 'Library function returned unexpeced function, linkage may be broken')
  //     })
  // })

  // it('should send coin correctly', function() {
  //   var meta

  //   //    Get initial balances of first and second account.
  //   var account_one = accounts[0]
  //   var account_two = accounts[1]

  //   var account_one_starting_balance
  //   var account_two_starting_balance
  //   var account_one_ending_balance
  //   var account_two_ending_balance

  //   var amount = 10

  //   return Cards.deployed()
  //     .then(function(instance) {
  //       meta = instance
  //       return meta.getBalance.call(account_one)
  //     })
  //     .then(function(balance) {
  //       account_one_starting_balance = balance.toNumber()
  //       return meta.getBalance.call(account_two)
  //     })
  //     .then(function(balance) {
  //       account_two_starting_balance = balance.toNumber()
  //       return meta.sendCoin(account_two, amount, { from: account_one })
  //     })
  //     .then(function() {
  //       return meta.getBalance.call(account_one)
  //     })
  //     .then(function(balance) {
  //       account_one_ending_balance = balance.toNumber()
  //       return meta.getBalance.call(account_two)
  //     })
  //     .then(function(balance) {
  //       account_two_ending_balance = balance.toNumber()

  //       assert.equal(
  //         account_one_ending_balance,
  //         account_one_starting_balance - amount,
  //         "Amount wasn't correctly taken from the sender"
  //       )
  //       assert.equal(
  //         account_two_ending_balance,
  //         account_two_starting_balance + amount,
  //         "Amount wasn't correctly sent to the receiver"
  //       )
  //     })
  // })
})
