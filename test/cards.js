/* eslint-disable */
import { transformValueArraysToCards } from '../src/utils/transformations'
import { catchRevert } from './utils/exceptions'

const Cards = artifacts.require('./Cards.sol')

function getBalance(account) {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(account, (err, res) => {
      if (err) reject(err)

      resolve(res)
    })
  })
}

function getTransaction(tx) {
  return new Promise((resolve, reject) => {
    web3.eth.getTransaction(tx, (err, res) => {
      if (err) reject(err)

      resolve(res)
    })
  })
}

contract('Card - Creation', accounts => {
  it('should create the initial cards', async () => {
    const instance = await Cards.deployed()
    const cards = transformValueArraysToCards(await instance.getCards.call())

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

  it('should create a new card', async () => {
    const instance = await Cards.deployed()

    await instance.createCard('Pikachu', 2, 3, '0xfe0d246ece96ef9c6c317f4b76c7dd9be4be585c2f8f743d47d9de07a2e207c8', {
      from: accounts[0],
    })

    const cards = transformValueArraysToCards(await instance.getCards.call())

    assert.deepEqual(cards[2], {
      id: 2,
      title: 'Pikachu',
      attack: 2,
      defense: 3,
      artwork: 'QmfSMtT9a1rXWsSDwrUFf2Jnbb41Ec4dwGV5WcAAMPZopB',
      weiPrice: web3.toBigNumber(6000000000000000),
    })
  })
})

contract('Card - Shop', accounts => {
  it('should buy a card', async () => {
    const instance = await Cards.deployed()

    await instance.buyCard(0, { from: accounts[0], value: 360000000000000000 })

    const ownedCards = transformValueArraysToCards(await instance.getCardsOwned.call())

    assert.deepEqual(ownedCards, [
      {
        id: 0,
        title: 'Friendly Dragon',
        attack: 12,
        defense: 30,
        artwork: 'QmfSMtT9a1rXWsSDwrUFf2Jnbb41Ec4dwGV5WcAAMPZopB',
        weiPrice: web3.toBigNumber(360000000000000000),
      },
    ])
  })

  it('should revert call to buyCard() when sent value is too low', async () => {
    const instance = await Cards.deployed()

    await catchRevert(instance.buyCard(0, { from: accounts[0], value: 1337 }))
  })
})

contract('Card - Rewards', accounts => {
  it('should increase claimable rewards for creator', async () => {
    const instance = await Cards.deployed()
    let creatorRewards = await instance.openRewardsInWei.call(accounts[0])
    let notCreatorRewards = await instance.openRewardsInWei.call(accounts[1])

    assert.deepEqual(creatorRewards, web3.toBigNumber(0))
    assert.deepEqual(notCreatorRewards, web3.toBigNumber(0))

    await instance.buyCard(0, { from: accounts[3], value: 360000000000000000 })

    creatorRewards = await instance.openRewardsInWei.call(accounts[0])
    notCreatorRewards = await instance.openRewardsInWei.call(accounts[1])

    assert.deepEqual(creatorRewards, web3.toBigNumber(360000000000000000))
    assert.deepEqual(notCreatorRewards, web3.toBigNumber(0))
  })

  it('should withdraw rewards to the creator', async () => {
    const instance = await Cards.deployed()
    let rewards = await instance.openRewardsInWei.call(accounts[0])

    // Initial balance
    const initial = await getBalance(accounts[0])
    console.log(`Initial: ${initial.toString()}`)

    // Obtain gas used from the receipt
    const receipt = await instance.claimRewards({ from: accounts[0] })
    const gasUsed = receipt.receipt.gasUsed
    console.log(`GasUsed: ${receipt.receipt.gasUsed}`)

    // Obtain gasPrice from the transaction
    const tx = await getTransaction(receipt.tx)
    const gasPrice = tx.gasPrice
    console.log(`GasPrice: ${tx.gasPrice}`)

    // Final balance
    const final = await getBalance(accounts[0])
    console.log(`Final: ${final.toString()}`)
    assert.equal(
      final
        .add(gasPrice.mul(gasUsed))
        .sub(rewards)
        .toString(),
      initial.toString()
    )
  })
})
