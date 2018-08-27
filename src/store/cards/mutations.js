import { transformValueArraysToCards } from '~/utils/transformations'
import { SET_ALL_CARDS } from './mutation-types'
import { SET_OWN_CARDS } from './mutation-types'
import { SET_OPEN_REWARDS } from './mutation-types'

export default {
  [SET_ALL_CARDS](state, values) {
    state.allCards = transformValueArraysToCards(values)
  },
  [SET_OWN_CARDS](state, values) {
    state.ownCards = transformValueArraysToCards(values)
  },
  [SET_OPEN_REWARDS](state, wei) {
    state.openRewards = wei.toNumber()
  },
}
