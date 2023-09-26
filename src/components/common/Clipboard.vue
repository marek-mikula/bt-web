<template>
  <button
    type="button"
    class="rounded border border-dashed border-gray-300 px-2 py-1 text-xs hover:bg-gray-100"
    @click.prevent="copy"
  >
    <span class="flex items-center">
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="mr-1 h-4 w-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
        />
      </svg>
      <slot>
        <span>
          {{ value }}
        </span>
      </slot>
    </span>
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
