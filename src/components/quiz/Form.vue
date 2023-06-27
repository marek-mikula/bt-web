<template>
  <div class="mx-auto max-w-lg overflow-hidden rounded-lg bg-white shadow">
    <!-- List of answers and question texts -->
    <template v-if="isInProgressState">
      <div class="relative space-y-5 px-4 py-5 sm:px-6">
        <div class="flex rounded-lg bg-gray-50 p-4">
          <div class="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5"
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
                  currentAnswer === answer.id && !answer.correct
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
            @click="selectAnswer(answer)"
          >
            <p>{{ answer.answer }}</p>
          </div>
        </div>

        <!-- Show user a hint when he clicked on the answer -->
        <div v-if="currentAnswer">
          <CommonAlert type="info" :message="currentQuestion.hint" />
        </div>

        <div class="flex items-center justify-between">
          <!-- back button -->
          <CommonButton color="secondary" @click="stepBack">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </CommonButton>

          <span class="text-gray-500">
            {{ currentQuestionId }} / {{ questions.length }}
          </span>

          <!-- finish/next button -->
          <CommonButton
            :disabled="!currentAnswer || !!interval"
            @click="stepNext"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </CommonButton>
        </div>

        <!-- interval block -->
        <div
          v-if="interval && currentAnswer"
          :class="[
            'absolute left-0 bottom-0 right-0 h-1 rounded',
            {
              'bg-red-400': !isCurrentAnswerCorrect,
              'bg-green-400': isCurrentAnswerCorrect
            }
          ]"
          :style="timerProgressStyle"
        ></div>
      </div>
    </template>

    <template v-else-if="isInFinishedState">
      <div class="relative space-y-5 px-4 py-5 sm:px-6">
        <p>Finito bráško!</p>
      </div>
    </template>

    <!-- Starting informational text -->
    <template v-else>
      <div class="space-y-5 px-4 py-5 sm:px-6">
        <h1 class="text-2xl">Informational quiz</h1>

        <div>
          <p class="mb-3 text-justify">
            Welcome to our crypto investment application for beginners! To
            ensure that you have the necessary knowledge to make informed
            investment decisions, we kindly request you to complete our
            mandatory entry quiz.
          </p>
          <p class="text-justify">
            This quiz is designed specifically for beginners like you, covering
            essential concepts and strategies related to crypto investments. By
            completing the quiz, you'll gain the foundation needed to navigate
            the exciting world of cryptocurrencies with confidence. Start your
            educational journey today and unlock the full potential of our
            application. Happy learning and successful investing!
          </p>
        </div>

        <div>
          <CommonButton label="Start quiz" block @click="stepNext" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useContext } from '@nuxtjs/composition-api'
import Vue from 'vue'
import { QuizAnswer, QuizQuestion } from '~/types/configs/Quiz'

const LOCAL_STORAGE_KEY = 'quiz-answers'

enum State {
  DEFAULT = 1,
  IN_PROGRESS = 2,
  FINISHED = 3
}

const { $configs } = useContext()

const questions = $configs.quiz.getQuestions()
const answers = ref<{ [key: number]: number }>({})

// quiz state
const state = ref<State>(State.DEFAULT)

// timer vars
const timeout = ref<number>(2)
const interval = ref<number | null>(null)
const timeLeft = ref<number | null>(null)
const speed = ref<number>(100)

// hold the information about current question
const currentQuestionId = ref<number | null>(null)

const isInProgressState = computed<boolean>(
  (): boolean => state.value === State.IN_PROGRESS
)
const isInFinishedState = computed<boolean>(
  (): boolean => state.value === State.FINISHED
)

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
const currentAnswer = computed<number | null>((): number | null => {
  if (!currentQuestionId.value) {
    return null
  }

  return answers.value[currentQuestionId.value] ?? null
})

const isCurrentAnswerCorrect = computed<boolean>((): boolean => {
  if (!currentAnswer.value || !currentQuestion.value) {
    return false
  }

  return (
    currentQuestion.value?.answers?.find((answer) => answer.correct)?.id ===
    currentAnswer.value
  )
})

const timerProgressStyle = computed<string>((): string => {
  const leftPercent = Math.round(
    ((((timeLeft.value ?? 0) * 100) / (timeout.value * 1000)) * 100) / 100
  )
  return `width: ${leftPercent}%; transition: width 0.1s linear;`
})

function selectAnswer(answer: QuizAnswer): void {
  if (!currentQuestionId.value) {
    return
  }

  Vue.set(answers.value, currentQuestionId.value, answer.id)

  timeLeft.value = timeout.value * 1000
  interval.value = window.setInterval((): void => updateTimer(), speed.value)
}

function resetTimer(): void {
  if (interval.value) {
    window.clearInterval(interval.value)
    interval.value = null
  }

  timeLeft.value = null
}

function updateTimer(): void {
  timeLeft.value = (timeLeft.value ?? 0) - speed.value

  if (timeLeft.value <= 0) {
    resetTimer()
  }
}

function getPreviousQuestion(): QuizQuestion | null {
  return (
    questions.find((question) => question.id + 1 === currentQuestionId.value) ||
    null
  )
}

function getNextQuestion(): QuizQuestion | null {
  return (
    questions.find(
      (question) => (currentQuestionId.value ?? 0) + 1 === question.id
    ) || null
  )
}

function stepNext(): void {
  const nextQuestion = getNextQuestion()

  // reset timer just in case
  resetTimer()

  // update quiz state if this was the end of the quiz
  if (!nextQuestion) {
    removeProgress()

    state.value = State.FINISHED

    return
  }

  // save progress
  saveProgress(answers.value)

  const isStart = !currentQuestionId.value

  currentQuestionId.value = nextQuestion.id

  // update quiz state if this was the start of the quiz
  if (isStart) {
    state.value = State.IN_PROGRESS
  }
}

function stepBack(): void {
  const previousQuestion = getPreviousQuestion()

  // remove current answer if any when going back
  if (currentQuestionId.value) {
    Vue.delete(answers.value, currentQuestionId.value)
  }

  // there is no previous question => user is at the start
  if (!previousQuestion) {
    state.value = State.DEFAULT
  }

  // save progress
  saveProgress(answers.value)

  // reset timer
  resetTimer()

  currentQuestionId.value = previousQuestion?.id || null
}

function loadProgress(): { [key: number]: number } | null {
  let value = localStorage.getItem(LOCAL_STORAGE_KEY)

  if (!value) {
    return null
  }

  value = JSON.parse(value)

  if (typeof value !== 'object') {
    return null
  }

  return value as any as { [key: number]: number }
}

function removeProgress(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY)
}

function saveProgress(answers: { [key: number]: number }): void {
  if (!Object.keys(answers).length) {
    localStorage.removeItem(LOCAL_STORAGE_KEY)

    return
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(answers))
}

onMounted((): void => {
  const progress = loadProgress()

  if (!progress) {
    return
  }

  answers.value = progress

  currentQuestionId.value =
    Math.max(...Object.keys(answers.value).map((answer) => parseInt(answer))) +
    1

  state.value = State.IN_PROGRESS
})
</script>

<script lang="ts">
export default {
  name: 'QuizForm'
}
</script>
