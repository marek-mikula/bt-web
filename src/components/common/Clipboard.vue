<template>
  <button
    type="button"
    class="rounded bg-gray-100 px-2 py-1 text-xs hover:bg-gray-200"
    @click.prevent="copy"
  >
    <slot>
      {{ value }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import { useContext } from '@nuxtjs/composition-api'

const { $toast, i18n } = useContext()

const props = defineProps<{
  value: string | number
}>()

async function copy(): Promise<void> {
  try {
    await navigator.clipboard.writeText(props.value + '')

    $toast.info({
      title: i18n.t('toasts.common.clipboard').toString()
    })
  } catch (e: any) {
    $toast.error({
      title: i18n.t('toasts.common.somethingWentWrong').toString()
    })
  }
}
</script>

<script lang="ts">
export default {
  name: 'CommonClipboard'
}
</script>
