<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Credenciais
    </h1>
    <p class="text-lg mt-5 text-center text-gray-800 font-regular">
      Guia de instalação e geração das suas credenciais
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-brand-darkgray">
        Instalação e Configuração
      </h1>
      <p class="mt-10 text-lg text-gray-800 font-regurar">
        Essa aqui é sua chave de api
      </p>
      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div
        v-else
        class="flex py-3 pl-5 pr-20 mt-2 justify-between w-full lg:w-3/4 rounded bg-brand-graydark">
        <span v-if="state.hasError">Erro ao carregar a apikey</span>
        <span v-else>{{ store.User.currentUser.apiKey }}</span>
        <div class="flex ml-20 mr-5" v-if="!state.hasError">
          <icon
            @click="handleCopy"
            name="copy"
            :color="brandColors.main"
            size="24"
            class="cursor-pointer"
          />
          <icon
            @click="handleGenerateApikey"
            name="loading"
            :color="brandColors.main"
            size="24"
            class="cursor-pointer"
          />
        </div>
      </div>
      <p class="mt-5 text-lg text-gray-800 font-regurar">
        Coloque esse script no seu site para começar a receber feedbacks dos usuários
      </p>
      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div
        v-else
        class="py-3 pl-5 pr-20 mt-2 w-full rounded bg-brand-graydark lg:w-3/4 overflow-x-scroll">
        <span v-if="state.hasError">Erro ao carregar o script</span>
        <pre v-else>&lt;script src="https://ulisseso2-feedbacker-widget.netlify.app?api_kei={{store.User.currentUser.apiKey}}"&gt;&lt;/script&gt;</pre>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLogged from '../../components/HeaderLogged'
import ContentLoader from '../../components/ContentLoader'
import useStore from '../../hooks/useStore'
import palette from '../../../palette'
import Icon from '../../components/Icon'
import { reactive, watch } from 'vue'
import services from '@/services'
import { setApiKey } from '@/Store/user'
import { useToast } from 'vue-toastification'

export default {
  components: { ContentLoader, HeaderLogged, Icon },
  setup () {
    const store = useStore()
    const toast = useToast()
    const state = reactive({
      hasError: false,
      isLoading: false
    })

    watch(() => store.User.currentUser, () => {
      if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
        handleError(true)
      }
    })

    function handleError (error) {
      state.isLoading = false
      state.hasError = !!error
    }

    async function handleGenerateApikey () {
      try {
        state.isLoading = true
        const { data } = await services.users.generateApikey()

        setApiKey(data.apiKey)
        state.isLoading = false
      } catch (error) {
        handleError(error)
      }
    }

    async function handleCopy () {
      toast.clear()
      try {
        await navigator.clipboard.writeText(store.User.currentUser.apiKey)
        toast.success('Copiado para área de Transferência')
      } catch (error) {
        handleError(error)
      }
    }
    return {
      state,
      store,
      brandColors: palette.brand,
      handleGenerateApikey,
      handleCopy
    }
  }
}
</script>
