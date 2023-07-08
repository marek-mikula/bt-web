<template>
  <div class="container mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
    <QuizForm v-if="questions" :questions="questions" />
    <div
      v-else
      class="mx-auto max-w-lg overflow-hidden rounded-lg bg-white shadow"
    >
      <div class="flex items-center justify-center p-5">
        <CommonSpinner :size="10" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAsync, useContext } from '@nuxtjs/composition-api'
import { QuizQuestion } from '~/types/http/entities/Quiz'

const { $repositories, $_ } = useContext()

const questions = useAsync<QuizQuestion[]>(async () => {
  const response = await $repositories.quiz.questions()
  const questions = response.data.data.questions

  // shuffle answers of each question
  return questions.map((question) => {
    question.answers = $_.shuffle(question.answers)
    return question
  })
}, 'questions')
</script>

<script lang="ts">
export default {
  name: 'AppQuizPage',
  layout: 'none'
}
</script>
