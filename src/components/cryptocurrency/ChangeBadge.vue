<template>
  <div
    :class="[
      'inline-flex items-baseline rounded-full px-2 py-0.5 text-xs font-medium md:mt-2 lg:mt-0',
      {
        'bg-green-100 text-green-800': state === 1,
        'bg-red-100 text-red-800': state === -1,
        'bg-gray-100 text-gray-800': state === 0
      }
    ]"
  >
    <!-- icon increasing -->
    <svg
      v-if="state === 1"
      class="-ml-1 mr-0.5 h-4 w-4 flex-shrink-0 self-center text-green-500"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
        clip-rule="evenodd"
      />
    </svg>

    <!-- icon decreasing -->
    <svg
      v-else-if="state === -1"
      class="-ml-1 mr-0.5 h-4 w-4 flex-shrink-0 self-center text-red-500"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
        clip-rule="evenodd"
      />
    </svg>

    <!-- icon stagnating -->
    <svg
      v-else
      class="-ml-1 mr-0.5 h-4 w-4 flex-shrink-0 self-center text-gray-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
      />
    </svg>

    <span class="sr-only">
      {{ $t(label) }}
    </span>

    {{ formatPercent(value) }}
  </div>
</template>

<script setup lang="ts">
import { computed } from '@nuxtjs/composition-api'
import { useFormat } from '~/composables/format'

const { formatPercent } = useFormat()

const props = defineProps<{
  value: number
}>()

const state = computed<-1 | 0 | 1>(() => {
  if (props.value > 0.0) {
    return 1
  }
  if (props.value < 0.0) {
    return -1
  }
  return 0
})

const label = computed<string>((): string => {
  switch (state.value) {
    case 1:
      return 'common.change.badge.increased'
    case 0:
      return 'common.change.badge.notChanged'
    case -1:
      return 'common.change.badge.decreased'
  }
})
</script>

<script lang="ts">
export default {
  name: 'CryptocurrencyChangeBadge'
}
</script>
