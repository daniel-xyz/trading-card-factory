import Vuex from 'vuex'
import cards from './cards'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      cards,
    },
  })
}

export default createStore
