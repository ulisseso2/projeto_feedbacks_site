import { readonly } from 'vue'
import UseModule from './user'
import GlobalModel from './global'

export default readonly({
  User: UseModule,
  Global: GlobalModel
})
// O readonly eu consigo ler o estado sem alterá-lo e para alterar eu uso as funções para alterar o estado dentro do modulo. Com um hook eu controlo esses estado.
