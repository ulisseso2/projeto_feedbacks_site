/* eslint-disable space-before-function-paren */
import { reactive } from 'vue'

const state = reactive({ // o reactive cria objetos reativos
  currentUser: {}
})

export default state // eu exporto o meu estado que será usado no meu index do Store

export function cleanCurrentUser() { // Essas funções serão usadas para manipular o estado pois não devo mudá-lo diretamente.
  state.currentUser = {}
}

export function setCurrentUser(user) {
  state.currentUser = user
}

export function setApiKey(apiKey) {
  const currentUser = { ...state.currentUser, apiKey }
  state.currentUser = currentUser
}
