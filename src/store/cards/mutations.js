import { getIpfsHashFromBytes32 } from '@/utils/ipfs'
import { SET_ALL_CARDS } from './mutation-types'
import { SET_OWN_CARDS } from './mutation-types'

function transformValueArraysToCards(web3, values) {
  const cardsCount = values[0].length
  const cards = []

  for (let i = 0; i < cardsCount; i++) {
    cards.push({
      title: web3.utils.toAscii(values[0][i]),
      attack: values[1][i].toNumber(),
      defense: values[2][i].toNumber(),
      creator: values[3][i],
      artwork: getIpfsHashFromBytes32(values[4][i]),
    })
  }

  return cards
}

export default {
  [SET_ALL_CARDS](state, values) {
    state.allCards = transformValueArraysToCards(this.$web3, values)
  },
  [SET_OWN_CARDS](state, values) {
    state.ownCards = transformValueArraysToCards(this.$web3, values)
  },
}
