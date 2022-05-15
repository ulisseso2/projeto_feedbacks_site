<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Credenciais
    </h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração das suas credenciais
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col items-center w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font black text-brand-darkgray">
        Instalação e Configuração
      </h1>
      <p class="mt-10 text-lg text-center text-gray-800 dont-regurar">
        Essa aqui é sua chave de api
      </p>
      <div class="flex py-3 pl-5 pr-20 mt-2 rounded intems-center bg-brand-gray">
        <span>{{ store.User.currentUser.apiKey }}</span>
        <div class="felx ml-20 mr-5">
          <icon
            name="copy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
          />
          <icon
            name="loading"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
          />
        </div>
      </div>
      <p class="mt-5 text-lg text-center text-gray-800 dont-regurar">
        Coloque esse script no seu site para começar a receber feedbacks
      </p>
      <div class="py-3 pl-5 pr-20 mt-2 rounded bd-brand-gray">
        <p>oi</p>
      <!--
        <pre>&lt;script src="http://ulisseso2-feedbacker-widget.netlify.app?api_kei={{sore.User.currentUser.apiKey}}"&gt;&lt;/script&gt;</pre>
      <-->
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLogged from '../../components/HeaderLogged'
import useStore from '../../hooks/useStore'
import palette from '../../../palette'
import Icon from '../../components/Icon'

export default {
  components: { HeaderLogged, Icon },
  setup () {
    const store = useStore()

    return {
      store,
      brandColors: palette.brand
    }
  }
}
</script>
