<template>
  <span
    :class="[
      'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
      colorClass
    ]"
  >
    {{ $t(label) }}
  </span>
</template>

<script setup lang="ts">
import { computed } from '@nuxtjs/composition-api'
import { ORDER_SIDE } from '~/enums/order/OrderSide'

const props = defineProps<{
  side: ORDER_SIDE
}>()

const label = computed<string>((): string => {
  return `models.order.side.${props.side.toLowerCase()}`
})

const colorClass = computed<string>((): string => {
  switch (props.side) {
    case ORDER_SIDE.BUY:
      return 'bg-green-50 text-green-600 ring-green-500/10'
    case ORDER_SIDE.SELL:
      return 'bg-red-50 text-red-700 ring-red-700/10'
  }
})
</script>

<script lang="ts">
export default {
  name: 'OrderSideBadge'
}
</script>
