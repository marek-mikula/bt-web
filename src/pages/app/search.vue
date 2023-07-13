<template>
  <div>
    <p>You searched "{{ query }}".</p>
  </div>
</template>

<script setup lang="ts">
import { computed, useRoute } from '@nuxtjs/composition-api'

const route = useRoute()

const query = computed<string>(
  (): string => (route.value.query.q || '') as string
)
</script>

<script lang="ts">
export default {
  name: 'AppCalendarPage',
  layout: 'app'
}
</script>
