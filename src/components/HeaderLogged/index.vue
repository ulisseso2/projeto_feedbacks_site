<template>
  <div class="flex items-center justify-between w-4/5 max-w-6xl py-10">
    <div class="w-28 lag:w-36">
      <img src="../../assets/images/logo.png" class="w-full" alt="logo">
    </div>
    <div class="flex">
      <ul class="flex list-none">
        <li
          @click="() => router.push({name: 'Feedbacks'})"
          class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none">
          Feedbacks
        </li>
        <li
          @click="() => router.push({name: 'Credencials'})"
          class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none">
          Credenciais
        </li>
        <li
          @click="handleLogout"
          class="px-6 py-2 mr-2 font-bold text-brand-main bg-white rounded-full cursor-pointer focus:outline-none">
          {{ LogoutLabel }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import useStore from '../../hooks/useStore'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { cleanCurrentUser } from '@/Store/user'

export default {
  setup () {
    const router = useRouter()
    const store = useStore('User')

    // computed é outra propriedade do vue que permite criar objeto e usamos como função
    const LogoutLabel = computed(() => {
      if (!store.currentUser.name) {
        return '...'
      }
      return `${store.currentUser.name} (Sair)`
    })

    function handleLogout () {
      window.localStorage.removeItem('token')
      // como estou salvando no localStorange eu estou só removendo o token
      cleanCurrentUser()
      router.push({ name: 'Home' })
    }

    return {
      router,
      LogoutLabel,
      handleLogout
    }
  }

}
</script>

<style>

</style>
