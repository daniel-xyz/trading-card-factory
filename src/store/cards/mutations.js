import { getIpfsHashFromBytes32 } from '@/utils/ipfs'
import { SET_ALL_CARDS } from './mutation-types'
import { SET_OWN_CARDS } from './mutation-types'
import { SET_OPEN_REWARDS } from './mutation-types'

function transformValueArraysToCards(web3, values) {
  const cardsCount = values[0].length
  const cards = []

  for (let i = 0; i < cardsCount; i++) {
    cards.push({
      id: values[0][i].toNumber(),
      title: web3.utils.toAscii(values[1][i]),
      attack: values[2][i].toNumber(),
      defense: values[3][i].toNumber(),
      artwork: getIpfsHashFromBytes32(values[4][i]),
      weiPrice: values[5][i],
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
  [SET_OPEN_REWARDS](state, wei) {
    state.openRewards = wei.toNumber()
  },
}
