<template>
  <div class="space-y-5 px-4 py-5 sm:px-6">
    <h1 class="mt-2 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
      {{ $t('pages.quiz.start.header') }}
    </h1>

    <div>
      <p class="mb-3 text-justify">
        {{ $t('pages.quiz.start.line1') }}
      </p>
      <p class="text-justify">
        {{ $t('pages.quiz.start.line2') }}
      </p>
    </div>

    <CommonAlert
      type="info"
      :label="$t('pages.quiz.start.alert.title').toString()"
      :message="$t('pages.quiz.start.alert.message').toString()"
    />

    <div>
      <CommonButton label="Start quiz" block @click="start" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'start'): void
}>()

function start(): void {
  emit('start')
}
</script>

<script lang="ts">
export default {
  name: 'QuizStart'
}
</script>
