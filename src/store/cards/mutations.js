import { SET_OWN_CARDS } from './mutation-types'

export default {
  [SET_OWN_CARDS](state, cards) {
    state.ownCards = cards
  },
}
