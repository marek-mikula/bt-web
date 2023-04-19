<template>
  <div>You are logged in! {{ user.firstname }} {{ user.lastname }}</div>
</template>

<script setup lang="ts">
import { useUser } from '~/composables/user'

const { user } = useUser()
</script>

<script lang="ts">
export default {
  name: 'AppHomePage',
  layout: 'none'
}
</script>
