<template>
  <CommonAlert v-if="visible" v-bind="props" @removed="handleRemoved" />
</template>

<script setup lang="ts">
import { onMounted, ref } from '@nuxtjs/composition-api'
import { AlertAction } from '~/types/common/Alert'

const props = withDefaults(
  defineProps<{
    identifier: string
    message?: string | null
    type?: 'success' | 'danger' | 'warning' | 'info'
    label?: string | null
    closable?: true
    actions?: AlertAction[]
  }>(),
  {
    message: null,
    type: 'success',
    label: null,
    closable: true,
    actions: () => []
  }
)

const visible = ref<boolean>(false)

function handleRemoved(): void {
  localStorage.setItem(props.identifier, '1')
}

if (process.browser) {
  onMounted((): void => {
    visible.value = localStorage.getItem(props.identifier) !== '1'
  })
}
</script>

<script lang="ts">
export default {
  name: 'CommonAlertOnce'
}
</script>
