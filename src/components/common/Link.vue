<template>
  <span class="isolate inline-flex rounded-md shadow-sm">
    <span
      class="max-w-[130px] truncate rounded-l-md bg-white px-1.5 py-1 text-xs text-gray-500 ring-1 ring-inset ring-gray-300"
    >
      {{ value }}
    </span>
    <button
      v-if="copy"
      type="button"
      :class="[
        'relative -ml-px inline-flex items-center bg-white px-1.5 py-1 text-sm text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10',
        {
          'rounded-r-md': !link
        }
      ]"
    >
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-4 w-4"
        @click.prevent="copyToClipboard"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
        />
      </svg>
    </button>
    <button
      v-if="link"
      type="button"
      class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-1.5 py-1 text-sm text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      @click.prevent="redirect"
    >
      <svg
        v-if="outer"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-4 w-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
        />
      </svg>
      <svg
        v-else
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-4 w-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
        />
      </svg>
    </button>
  </span>
</template>

<script setup lang="ts">
import { useContext } from '@nuxtjs/composition-api'

const { $toast, i18n } = useContext()

const props = withDefaults(
  defineProps<{
    value: string
    valueLink?: string | null
    link?: boolean
    copy?: boolean
    outer?: boolean
    length?: number
  }>(),
  {
    valueLink: null,
    link: false,
    copy: false,
    outer: false,
    length: 30
  }
)

async function copyToClipboard(): Promise<void> {
  try {
    await navigator.clipboard.writeText(props.value)

    $toast.info({
      title: i18n.t('toasts.common.clipboard').toString()
    })
  } catch (e: any) {
    $toast.error({
      title: i18n.t('toasts.common.somethingWentWrong').toString()
    })
  }
}

function redirect(): void {
  if (props.outer) {
    window.open(props.valueLink ?? props.value)
  } else {
    window.location.replace(props.valueLink ?? props.value)
  }
}
</script>

<script lang="ts">
export default {
  name: 'CommonLink'
}
</script>
