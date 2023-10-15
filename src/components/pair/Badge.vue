<template>
  <span
    class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200"
  >
    {{ symbol }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  symbol: string
}>()
</script>

<script lang="ts">
export default {
  name: 'PairBadge'
}
</script>
