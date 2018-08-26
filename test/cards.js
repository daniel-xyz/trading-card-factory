/* eslint-disable */
var Cards = artifacts.require('./Cards.sol')

contract('Cards', accounts => {
  it('should create the initial cards', () => {
    return Cards.deployed()
      .then(instance => {
        return instance.getCards.call()
      })
      .then(values => {
        assert.equal(web3.toUtf8(values[1][0]), 'Friendly Dragon', 'Title of the first card is not correct.')
        assert.equal(web3.toUtf8(values[1][1]), 'Unhappy Dragon', 'Title of the second card is not correct.')
      })
  })
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
