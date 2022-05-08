<template>
  <custom-header
  @create-accont="handleAccountCreate"
  @login="handleLogin"
  />
  <contact />
  <div class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800"> feedbacks</p>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
import CustomHeader from './CustomHeader.vue'
import Contact from './Contact.vue'

export default {
  components: { CustomHeader, Contact },
  setup () {
    const router = useRoute()

    onMounted(() => {
      const token = window.localStorage.getItem('token')
      if (token) {
        router.push({ name: 'Feedbacks' })
      }
    })
  }
}
</script>

<style>

</style>
