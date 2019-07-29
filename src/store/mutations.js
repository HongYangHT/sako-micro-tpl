import { SET_POEMS, SET_SINGLE_SPA } from './constants'

export default {
  [SET_POEMS](state, payload) {
    state.poems = payload
  },
  [SET_SINGLE_SPA](state, payload) {
    state.singleSpa = payload
  }
}
