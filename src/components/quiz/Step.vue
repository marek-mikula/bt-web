<template>
  <div class="relative space-y-5 px-4 py-5 sm:px-6">
    <!-- Question text box -->
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
        {{ currentQuestion.text }}
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
        <p>{{ answer.text }}</p>
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
        <p>{{ answer.text }}</p>
      </div>
    </div>

    <!-- Show user a hint when he clicked on the answer -->
    <div v-if="currentAnswer">
      <CommonAlert type="info" :message="currentQuestion.hint" />
    </div>

    <div class="flex items-center justify-between">
      <!-- back button -->
      <CommonButton color="secondary" :is-loading="loading" @click="stepBack">
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
        {{ currentQuestion.id }} / {{ questions.length }}
      </span>

      <!-- finish/next button -->
      <CommonButton
        :disabled="!currentAnswer || !!interval"
        :is-loading="loading"
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

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from '@nuxtjs/composition-api'
import { QuizAnswer, Quiz } from '~/types/http/entities/Quiz'

interface Props {
  currentQuestion: Quiz
  currentAnswer?: number | null
  questions: Quiz[]
}

const props = withDefaults(defineProps<Props>(), {
  currentAnswer: null
})

const emit = defineEmits<{
  (e: 'selected', answer: QuizAnswer): void
  (e: 'next'): void
  (e: 'back'): void
}>()

const loading = ref<boolean>(false)

// timer vars
const timeout = ref<number>(2)
const interval = ref<number | null>(null)
const timeLeft = ref<number | null>(null)
const speed = ref<number>(100)

const timerProgressStyle = computed<string>((): string => {
  const leftPercent = Math.round(
    ((((timeLeft.value ?? 0) * 100) / (timeout.value * 1000)) * 100) / 100
  )
  return `width: ${leftPercent}%; transition: width 0.1s linear;`
})

const isCurrentAnswerCorrect = computed<boolean>((): boolean => {
  if (!props.currentAnswer) {
    return false
  }

  return (
    props.currentQuestion.answers.find((answer) => answer.correct)?.id ===
    props.currentAnswer
  )
})

function selectAnswer(answer: QuizAnswer): void {
  if (!props.currentQuestion.id) {
    return
  }

  // emit selected event
  emit('selected', answer)

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

function stepBack(): void {
  resetTimer()

  emit('back')
}

function stepNext(): void {
  resetTimer()

  emit('next')
}

onBeforeUnmount((): void => {
  resetTimer()
})
</script>

<script lang="ts">
export default {
  name: 'QuizStep'
}
</script>
