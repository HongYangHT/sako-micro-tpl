import { KEY_APP_COUNT } from '@/store/utils/constants'

export function getAppCount(params) {
  let count = parseInt(window.localStorage.getItem(KEY_APP_COUNT), 10)
  if (isNaN(count)) {
    count = 0
  }
  return count
}
