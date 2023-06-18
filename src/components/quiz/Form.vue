<template>
  <div class="mx-auto max-w-lg overflow-hidden rounded-lg bg-white shadow">
    <!-- List of answers and question texts -->
    <template v-if="currentQuestion">
      <div class="space-y-5 px-4 py-5 sm:px-6">
        <div class="flex rounded-lg bg-gray-50 p-4">
          <div class="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <p class="ml-2">
            {{ currentQuestion.question }}
          </p>
        </div>

        <!-- Show correct/incorrect answers when user clicks on the answer -->
        <div v-if="currentAnswer" class="space-y-3">
          <div
            v-for="answer in currentQuestion.answers"
            :key="answer.id"
            :class="[
              'rounded-lg border-2 p-3',
              {
                'border-green-200 bg-green-50 text-green-700': answer.correct,
                'border-red-200 bg-red-50 text-red-700':
                  currentAnswer.answer === answer.id && !answer.correct
              }
            ]"
          >
            <p>{{ answer.answer }}</p>
          </div>
        </div>

        <!-- User has not clicked on the answer -> list the possible answers -->
        <div v-else class="space-y-3">
          <div
            v-for="answer in currentQuestion.answers"
            :key="answer.id"
            class="cursor-pointer rounded-lg border-2 border-gray-200 p-3 hover:bg-gray-200"
            @click="selectAnswer(answer.id, !!answer.correct)"
          >
            <p>{{ answer.answer }}</p>
          </div>
        </div>

        <!-- Show user a hint when he clicked on the answer -->
        <div v-if="currentAnswer">
          <CommonAlert type="info" :message="currentQuestion.hint" />
        </div>

        <div class="flex justify-between">
          <CommonButton color="secondary" label="Back" @click="stepBack" />
          <CommonButton
            label="Next"
            :disabled="!currentAnswer"
            @click="stepNext"
          />
        </div>
      </div>
    </template>

    <!-- Starting informational text -->
    <template v-else>
      <div class="px-4 py-5 sm:px-6">Informational quiz</div>
      <div class="px-4 py-5 sm:p-6">
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
      <div class="px-4 py-4 text-right sm:px-6">
        <CommonButton label="Start quiz" @click="startQuiz" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useContext } from '@nuxtjs/composition-api'
import QuizQuestion from '~/types/configs/QuizQuestion'

type Answer = {
  id: number
  answer: number
  correct: boolean
}

const { $configs } = useContext()

const questions = $configs.quiz.getQuestions()
const answers = ref<Answer[]>([])

// hold the information about current question
const currentQuestionId = ref<number | null>(null)

// current question object
const currentQuestion = computed<QuizQuestion | null>(
  (): QuizQuestion | null => {
    if (!currentQuestionId.value) {
      return null
    }

    return (
      questions.find((question) => question.id === currentQuestionId.value) ||
      null
    )
  }
)

// current user's answer object
const currentAnswer = computed<Answer | null>((): Answer | null => {
  if (!currentQuestionId.value) {
    return null
  }

  return (
    answers.value.find((answer) => answer.id === currentQuestionId.value) ||
    null
  )
})

function startQuiz(): void {
  currentQuestionId.value = questions[0].id
}

function selectAnswer(answerId: number, correct: boolean): void {
  if (!currentQuestion.value) {
    return
  }

  answers.value.push({
    id: currentQuestion.value.id,
    answer: answerId,
    correct
  })
}

function stepNext(): void {}

function stepBack(): void {
  let previousQuestion = null

  for (const question of questions) {
    if (question.id === currentQuestionId.value) {
      break
    }

    previousQuestion = question
  }

  currentQuestionId.value = previousQuestion?.id || null
}
</script>

<script lang="ts">
export default {
  name: 'QuizForm'
}
</script>
