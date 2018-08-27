import { getWeb3Instance } from '../plugins/web3'
import { getIpfsHashFromBytes32 } from '../utils/ipfs'

export function transformValueArraysToCards(values) {
  const cardsCount = values[0].length
  const cards = []

  for (let i = 0; i < cardsCount; i++) {
    cards.push({
      id: values[0][i].toNumber(),
      title: getWeb3Instance().utils.toUtf8(values[1][i]),
      attack: values[2][i].toNumber(),
      defense: values[3][i].toNumber(),
      artwork: getIpfsHashFromBytes32(values[4][i]),
      weiPrice: values[5][i],
    })
  }

  return cards
}
