<template>
  <div class="relative space-y-5 px-4 py-5 sm:px-6">
    <p>Finito bráško!</p>
    <div>
      <CommonButton label="Finish quiz" block @click="finish" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'finish'): void
}>()

function finish(): void {
  emit('finish')
}
</script>

<script lang="ts">
export default {
  name: 'QuizEnd'
}
</script>
