<template>
  <div>
    {{ id }}
  </div>
</template>

<script setup lang="ts">
import { computed, useRoute } from '@nuxtjs/composition-api'

const route = useRoute()

const id = computed<number>(() => parseInt(route.value.params.id))
</script>

<script lang="ts">
export default {
  name: 'AppCryptocurrenciesDetailPage',
  layout: 'app'
}
</script>
