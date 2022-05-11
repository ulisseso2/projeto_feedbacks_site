<template>
<!-- Modal de Login-->
  <div class="flex justify-between">
    <h1 class="text-2xl font-black text-brand-main ">Entre na sua Conta</h1>
    <button
      @click="close"
      class="hover:bg-gray-300 text-2xl text-brand-main py-0 px-2 focus:outline-none"
    >
      &times;
    </button>
  </div>
  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800 mt-1"> E-mail </span>
        <input
          v-model="state.email.value"
          type="email"
          class="block w-full mt-1 px-3 py-2 text-lg bg-gray-200 border-2 border-transparent rounded-lg"
          :class="{
            'border-brand-danger': !!state.email.errorMessage
          }"
          placeholder="Digite seu email"
        >
        <!-- abaixo verifico se há algo no errorMessage com !!... e crio uma classe para colorir o input -->
        <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
        >
        {{ state.email.errorMessage }}
        </span>
      </label>
      <label class="block">
        <span class="text-lg font-medium text-gray-800 mt-3"> Senha </span>
        <input
          v-model="state.password.value"
          type="password"
          class="block w-full mt-1 px-3 py-2 text-lg bg-gray-200 border-2 border-transparent rounded-lg"
          :class="{
            'border-brand-danger': !!state.password.errorMessage
          }"
          placeholder="Digite seu password"
        >
        <!-- abaixo verifico se há algo no errorMessage com !!... e crio uma classe para colorir o input -->
        <span
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger"
        >
        {{ state.password.errorMessage }}
        </span>
      </label>
      <button
        :disabled="state.isLoading"
        type="submit"
        :class="{
          'opacity-50 cursor-not-allowed': state.isLoading
        }"
        class="px-8 py-2 mt-10 text-1xl font-bold text-white bg-brand-main rounded-full focus:outline-none transition-all duration-200"
      >
        Entrar
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
// useField pertence a biblioteca do vee e controla minhas validações
import { useField } from 'vee-validate'
import { validateEmptyAddLength3, validateEmptyAndEmail } from '../../utils/validators'
import useModal from '../../hooks/useModal'
import services from '../../services'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

export default { // Configurando estado do Modal de Login

  setup () {
    const router = useRoute()
    const modal = useModal() // Instanciando modal (hook próprio para usar a função close)
    const toast = useToast()
    const {
      value: emailValue,
      errorMessage: emailErrorMessage
    } = useField('email', validateEmptyAndEmail) // Instanciando o campo email
    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAddLength3) // Instanciando o campo password

    const state = reactive({ // reactive do vue
      hasErrors: false, // Casos de Erros
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true
        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value
        })
        if (!errors) {
          window.localStorage.setItem('token', data.token)
          state.isLoading = false
          router.push({ nome: 'Feedbacks' })
          modal.close()
          return
        }

        if (errors.status === 404) {
          toast.error('e-mail não encontrado')
        }
        if (errors.status === 401) {
          toast.error('e-mail/senha Inválido')
        }
        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao fazer login')
        }
        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        state.hasErrors = !!error
        toast.error('e-mail/senha Inválido')
      }
    }
    return {
      state,
      close: modal.close, // retornando meu hook para ter acesso a ele no meu template
      handleSubmit
    }
  }
}
</script>
