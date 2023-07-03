<template>
  <div class="space-y-5 px-4 py-5 sm:px-6">
    <h1 class="text-2xl">Informational quiz</h1>
    <div>
      <p class="mb-3 text-justify">
        Welcome to our crypto investment application for beginners! To ensure
        that you have the necessary knowledge to make informed investment
        decisions, we kindly request you to complete our mandatory entry quiz.
      </p>
      <p class="text-justify">
        This quiz is designed specifically for beginners like you, covering
        essential concepts and strategies related to crypto investments. By
        completing the quiz, you'll gain the foundation needed to navigate the
        exciting world of cryptocurrencies with confidence. Start your
        educational journey today and unlock the full potential of our
        application. Happy learning and successful investing!
      </p>
    </div>

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
