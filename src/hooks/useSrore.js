/* eslint-disable space-before-function-paren */
import Store from '../Store'

export default function useStore(module) {
  if (module) {
    return Store[module]
  }
  return Store
}

// Posso usar como um hook, se eu passar um módulo essa função vai trabalhar no módulo específico, se não ela vai me passar o Store completo.
