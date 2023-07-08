<template>
  <div>
    <div
      v-if="isLoading"
      class="mx-auto max-w-lg overflow-hidden rounded-lg bg-white shadow"
    >
      <div class="flex items-center justify-center p-5">
        <CommonSpinner :size="10" />
      </div>
    </div>
    <div v-else class="relative space-y-5 px-4 py-5 sm:px-6">
      <h1 class="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
        {{ $t('pages.quiz.end.header') }}
      </h1>

      <div>
        <dl
          class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg border bg-white sm:grid-cols-2 sm:divide-x sm:divide-y-0"
        >
          <div class="relative col-span-1 px-4 py-5 sm:p-5">
            <dt
              class="text-center text-base font-normal text-gray-900 sm:text-left"
            >
              {{ $t('pages.quiz.end.statistics.correct') }}
            </dt>
            <div
              class="mt-1 text-center text-3xl font-semibold text-green-600 sm:text-left"
            >
              {{ correctAnswersCount }} / {{ totalAnswersCount }}
            </div>
            <div
              v-if="correctAnswersCount > 0"
              class="absolute left-0 bottom-0 right-0 h-1 bg-green-400"
              :style="correctAnswersStyle"
            ></div>
          </div>
          <div class="relative col-span-1 px-4 py-5 sm:p-5">
            <dt
              class="text-center text-base font-normal text-gray-900 sm:text-left"
            >
              {{ $t('pages.quiz.end.statistics.wrong') }}
            </dt>
            <div
              class="mt-1 text-center text-3xl font-semibold text-red-600 sm:text-left"
            >
              {{ wrongAnswersCount }} / {{ totalAnswersCount }}
            </div>
            <div
              v-if="wrongAnswersCount > 0"
              class="absolute left-0 bottom-0 right-0 h-1 bg-red-400"
              :style="wrongAnswersStyle"
            ></div>
          </div>
        </dl>
      </div>

      <div>
        <dl class="grid grid-cols-1">
          <div
            class="overflow-hidden rounded-lg border bg-white px-4 py-5 sm:p-5"
          >
            <dt class="text-center text-base font-normal text-gray-900">
              {{ $t('pages.quiz.end.statistics.total') }}
            </dt>
            <dd
              class="mt-1 text-center text-3xl font-semibold tracking-tight text-gray-900"
            >
              {{ totalPercentage }} %
            </dd>
          </div>
        </dl>
      </div>

      <div>
        <p v-if="totalPercentage <= 25.0" class="text-justify">
          {{ $t('pages.quiz.end.score.1') }}
        </p>
        <p
          v-else-if="totalPercentage > 25.0 && totalPercentage <= 50.0"
          class="text-justify"
        >
          {{ $t('pages.quiz.end.score.2') }}
        </p>
        <p
          v-else-if="totalPercentage > 50.0 && totalPercentage <= 75.0"
          class="text-justify"
        >
          {{ $t('pages.quiz.end.score.3') }}
        </p>
        <p v-else class="text-justify">
          {{ $t('pages.quiz.end.score.4') }}
        </p>
      </div>

      <div>
        <p>
          {{ $t('pages.quiz.end.text') }}
        </p>
      </div>

      <div>
        <CommonButton
          :label="$t('pages.quiz.end.button').toString()"
          block
          :is-loading="formIsLoading"
          @click="finish"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from '@nuxtjs/composition-api'
import { ref } from 'vue'
import { QuizAnswer, QuizQuestion } from '~/types/http/entities/Quiz'
import { useLoading } from '~/composables/loading'

const { isLoading, setIsLoading } = useLoading(true)

const props = defineProps<{
  questions: QuizQuestion[]
  answers: { [key: number]: number }
  formIsLoading: boolean
}>()

const totalAnswersCount = ref<number>(Object.keys(props.answers).length)
const correctAnswersCount = ref<number>(0)
const wrongAnswersCount = ref<number>(0)

const totalPercentage = computed<string>((): string => {
  return (
    ((correctAnswersCount.value ?? 0) * 100) /
    totalAnswersCount.value
  ).toFixed(2)
})

const correctAnswersLength = computed<number>((): number => {
  return Math.round((correctAnswersCount.value * 100) / totalAnswersCount.value)
})
const wrongAnswersLength = computed<number>((): number => {
  return Math.round((wrongAnswersCount.value * 100) / totalAnswersCount.value)
})

const correctAnswersStyle = computed<string>((): string => {
  return `width: ${correctAnswersLength.value}%;`
})
const wrongAnswersStyle = computed<string>((): string => {
  return `width: ${wrongAnswersLength.value}%;`
})

const emit = defineEmits<{
  (e: 'finish'): void
}>()

function finish(): void {
  emit('finish')
}

function countAnswers(): Promise<void> {
  return new Promise<void>((resolve) => {
    correctAnswersCount.value = 0
    wrongAnswersCount.value = 0

    Object.entries(props.answers).forEach(([key, value]: [string, number]) => {
      const questionId = parseInt(key)
      const question = props.questions.find(
        (question) => question.id === questionId
      ) as QuizQuestion
      const correctAnswer = question.answers.find(
        (answer) => answer.correct
      ) as QuizAnswer

      if (correctAnswer.id === value) {
        correctAnswersCount.value = (correctAnswersCount.value ?? 0) + 1
      } else {
        wrongAnswersCount.value = (wrongAnswersCount.value ?? 0) + 1
      }
    })

    resolve()
  })
}

onMounted(async () => {
  await countAnswers()

  setIsLoading(false)
})
</script>

<script lang="ts">
export default {
  name: 'QuizEnd'
}
</script>
