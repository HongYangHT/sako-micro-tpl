import { homeService } from '@/utils/http'
import { SET_POEMS } from './constants'

export function getHomeInit({ commit }, params) {
  return homeService
    .getHomeInit('/', params)
    .then(result => {
      if (result.data && result.data.code === 0) {
        commit(SET_POEMS, result.data.data)
      }
      return result.data || {}
    })
    .catch(error => {
      throw new Error(error)
    })
}
