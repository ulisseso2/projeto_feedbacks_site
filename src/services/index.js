import { setGlobaltLoading } from '@/Store/global'
import axios from 'axios'
import router from '../router'
import AuthService from './auth'
import UsersServices from './users'

const API_ENVS = {
  production: '',
  development: '',
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS.local
})

/* Essa configuração recebe as informações da API, eu faço a verificação se existe token e o coloco no header do Altorization retornando as configurações modificadas.
Para veirficar se o token é válido no response eu crio um if retornando os erros 401 para home */
httpClient.interceptors.request.use(config => {
  setGlobaltLoading(true)
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
  }
  return config
})

httpClient.interceptors.response.use((response) => {
  setGlobaltLoading(false)
  return response
}, (error) => {
  const canThrowAnError = error.request.status === 0 ||
    error.request.status === 500

  if (canThrowAnError) {
    setGlobaltLoading(false)
    throw new Error(error.message)
  }

  // aqui eu peguei o erro de token suoracitado e devolvi o usuário para home
  if (error.response.status === 401) {
    router.push({ name: 'Home' })
  }
  setGlobaltLoading(false)
  return error
})

export default {
  auth: AuthService(httpClient),
  users: UsersServices(httpClient)
}
