<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>
  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Feedbacks
    </h1>
    <p class="text-lg mt-5 text-center text-gray-800 font-regular">
      Detalhes de todos os Feedbacks Recebidos
    </p>
  </div>

  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid grid-cols-4 gap-2">
      <div>
        <h1 class="text-3xl font-black text-brand-darkgray">
          Listgem
        </h1>
        <suspense>
          <template #default>
            <filters
              class="mt-8 animate__animated animate__fadeIn animate__faster"
            />
          </template>
          <template #fallback>
            <filters-loading class="mt-8"/>
          </template>
        </suspense>

      </div>
      <div class="px-10 pt-20 col-span-3 bg-brand-gray">
        <p
          v-if="state.hasError"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Ocorreu um erro ao carregar os feedbacks :(
        </p>
        <p
          v-if="!state.feedbacks.length && !state.isLoadding"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Ainda nenhum feedback recebido
        </p>
        <feedbacks-card-loading v-if="state.isLoading" />
        <feedbacks-card
          v-else
          v-for="(feedback, index) in state.feedbacks"
          :key="feedback.id"
          :is-opened="index === 0"
          :feedback="feedback"
          class="mb-8"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import HeaderLogged from '../../components/HeaderLogged'
import Filters from './Filters'
import FiltersLoading from './FiltersLoading'
import FeedbacksCard from '../../components/FeedbacksCard'
import FeedbacksCardLoading from '../../components/FeedbacksCard/Loading'
import services from '@/services'

export default {
  components: {
    HeaderLogged,
    Filters,
    FiltersLoading,
    FeedbacksCard,
    FeedbacksCardLoading
  },
  setup () {
    const state = reactive({
      isLoading: false,
      feedbacks: [],
      hasError: false,
      currentFeedbacksType: '',
      pagination: {
        limit: 5,
        offset: 0
      }
    })
    onMounted(() => {
      fetchFeedbacks()
    })

    function handleErrors (error) {
      state.hasError = !!error
    }

    async function fetchFeedbacks () {
      try {
        state.isLoading = true
        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbacksType
        })

        state.feedbacks = data.results
        state.pagination = data.pagination
        state.isLoading = false
      } catch (error) {
        handleErrors(error)
      }
    }
    return {
      state,
      fetchFeedbacks,
      handleErrors
    }
  }

}
</script>

<style>

</style>
