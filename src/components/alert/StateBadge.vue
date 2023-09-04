<template>
  <span
    v-if="notified"
    class="inline-flex items-center rounded-md bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
  >
    {{ $t('alert.state.notified') }}
  </span>
  <span
    v-else
    class="inline-flex items-center rounded-md bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
  >
    {{ $t('alert.state.active') }}
  </span>
</template>

<script setup lang="ts">
import { computed } from '@nuxtjs/composition-api'
import { Alert } from '~/types/http/Entities'

const props = defineProps<{
  alert: Alert
}>()

const notified = computed<boolean>(() => !!props.alert.notifiedAt)
</script>

<script lang="ts">
export default {
  name: 'AlertStateBadge'
}
</script>
