<template>
  <span
    :title="$t(title).toString()"
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
import { MARKET_CAP_CATEGORY } from '~/enums/currency/MarketCapCategory'

const props = defineProps<{
  category: MARKET_CAP_CATEGORY
}>()

const label = computed<string>((): string => {
  return `models.currency.marketCapCategory.short.${props.category}`
})

const title = computed<string>((): string => {
  return `models.currency.marketCapCategory.long.${props.category}`
})

const colorClass = computed<string>((): string => {
  switch (props.category) {
    case MARKET_CAP_CATEGORY.MICRO:
      return 'bg-gray-50 text-gray-600 ring-gray-500/10'
    case MARKET_CAP_CATEGORY.SMALL:
      return 'bg-blue-50 text-blue-700 ring-blue-700/10'
    case MARKET_CAP_CATEGORY.MID:
      return 'bg-pink-50 text-pink-700 ring-pink-700/10'
    case MARKET_CAP_CATEGORY.LARGE:
      return 'bg-purple-50 text-purple-700 ring-purple-700/10'
    case MARKET_CAP_CATEGORY.MEGA:
      return 'bg-indigo-50 text-indigo-700 ring-indigo-700/10'
  }
})
</script>

<script lang="ts">
export default {
  name: 'CryptocurrencyMarketCapCategoryBadge'
}
</script>
