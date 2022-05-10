<template>
<!-- Com esse ModalFactory eu consigo controlar o estado da minha página quando um outro modal estiver aberto na tela, setando a opacidade e comportamento do clique nos modais-->
  <teleport to="body">
    <div
      v-if="state.isActive"
      class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
      @click="handleModalToogle({ status: false })"
    >
      <div
        class="fixed mx-10"
        :class="state.width"
        @click.stop
      >
        <div class="flex flex-col over-flow-hidden bg-white rounded-lg animate__animated animate__fadeInDown animate__faster">
          <div class="flex flex-col rounded-lg px-12 py-10 bg-white">
            <component :is="state.component"/>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { defineAsyncComponent, onBeforeUnmount, onMounted, reactive } from 'vue'
import useModal from '../../hooks/useModal' // hook cricado para administrar os modais

const ModalLogin = defineAsyncComponent(() => import('../ModalLogin'))
const ModalAccountCreate = defineAsyncComponent(() => import('../ModalAccountCreate'))

const DEFAULT_WIDTH = 'w-3/4 lg:w-1/3'

export default {
  components: {
    ModalLogin,
    ModalAccountCreate
  },
  setup () {
    const modal = useModal()
    const state = reactive({
      isActive: false,
      component: {},
      propos: {},
      width: DEFAULT_WIDTH
    })
    // quando o modal e montado
    onMounted(() => {
      modal.listen(handleModalToogle)
    })
    // depois que o modal é montado
    onBeforeUnmount(() => { modal.off(handleModalToogle) })
    function handleModalToogle (payload) {
      if (payload.status) {
        state.component = payload.component
        state.props = payload.props
        state.width = payload.width ?? DEFAULT_WIDTH
      } else {
        state.component = {}
        state.props = {}
        state.width = DEFAULT_WIDTH
      }
      state.isActive = payload.status
    }
    return {
      state,
      handleModalToogle
    }
  }
}
</script>
