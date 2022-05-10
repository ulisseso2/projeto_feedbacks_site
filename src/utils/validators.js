/* eslint-disable */
// esse utils é responsável por armazenar as minhas regras de validação dos formulários de cadastro e Login
export function validateEmptyAddLength3(value) {
  if (!value) {
    return '* Este campo é obrigatório'
  }
  if (value.length < 3) {
    return 'Este campo deve conter mais de 3 caracteres'
  }
  return true
}

export function validateEmptyAndEmail(value) {
  if (!value) {
    return 'Este campo é obrigatório'
  }
  const isValidRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value)
  if (!isValidRegex) {
    return 'Este campo precisa de um email válido'
  }
  return true
}
