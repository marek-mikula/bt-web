<template>
  <div>
    <div>You are logged in!</div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { useContext, useRouter } from '@nuxtjs/composition-api'

const { $auth } = useContext()
const router = useRouter()

async function logout() {
  await $auth.logout()

  await router.push({ path: '/' })
}
</script>

<script lang="ts">
export default {
  name: 'AppHome',
  layout: 'none'
}
</script>
