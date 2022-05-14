/* eslint-disable space-before-function-paren */
import { reactive } from 'vue'

const state = reactive({
  isLoading: false
})

export default state

export function setGlobaltLoading(status) {
  state.isLoading = status
}
