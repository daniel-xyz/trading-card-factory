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

// Test if cards are created and stored properly, since this is a main part of the Card contract.
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

// Test if cards can be bought and that the contract cannot be tricked by paying less than intended.
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

// Test if rewards and withdraws of those are credited to the right account in the right amount.
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
    const rewards = await instance.openRewardsInWei.call(accounts[0])
    const initialBalance = await getBalance(accounts[0])
    const receipt = await instance.claimRewards({ from: accounts[0] })
    const gasUsed = receipt.receipt.gasUsed
    const tx = await getTransaction(receipt.tx)
    const finalBalance = await getBalance(accounts[0])

    assert.equal(
      finalBalance
        .add(tx.gasPrice.mul(gasUsed))
        .sub(rewards)
        .toString(),
      initialBalance.toString()
    )
  })

  it('should reset claimable rewards to zero when claimed', async () => {
    const instance = await Cards.deployed()
    const rewardsLeft = await instance.openRewardsInWei.call(accounts[0])

    assert.equal(web3.toBigNumber(rewardsLeft), 0)
  })

  it('should revert call to claimRewards() when account has now claimable rewards', async () => {
    const instance = await Cards.deployed()

    await catchRevert(instance.claimRewards({ from: accounts[1] }))
  })
})
