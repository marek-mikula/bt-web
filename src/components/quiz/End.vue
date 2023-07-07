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
      <div v-if="wrongAnswersCount > 0 || correctAnswersCount > 0" class="flex">
        <div
          v-if="correctAnswersCount > 0"
          :class="[
            'h-2 bg-green-400',
            {
              'rounded-l': wrongAnswersCount > 0,
              rounded: wrongAnswersCount <= 0
            }
          ]"
          :style="correctAnswersStyle"
        ></div>
        <div
          v-if="wrongAnswersCount > 0"
          :class="[
            'h-2 bg-red-400',
            {
              'rounded-r': correctAnswersCount > 0,
              rounded: correctAnswersCount <= 0
            }
          ]"
          :style="wrongAnswersStyle"
        ></div>
      </div>

      <div>
        <dl class="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div
            class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt class="truncate text-sm font-medium text-green-500">
              Correct answers
            </dt>
            <dd
              class="mt-1 text-3xl font-semibold tracking-tight text-gray-900"
            >
              {{ correctAnswersCount }} / {{ totalAnswersCount }}
            </dd>
          </div>
          <div
            class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt class="truncate text-sm font-medium text-red-500">
              Wrong answers
            </dt>
            <dd
              class="mt-1 text-3xl font-semibold tracking-tight text-gray-900"
            >
              {{ wrongAnswersCount }} / {{ totalAnswersCount }}
            </dd>
          </div>
        </dl>
      </div>

      <div>
        <p class="text-justify">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Mauris
          tincidunt sem sed arcu. Aenean placerat. Nulla non lectus sed nisl
          molestie malesuada. Aliquam erat volutpat. Pellentesque arcu. Fusce
          aliquam vestibulum ipsum. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos hymenaeos. Nullam eget nisl.
          In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos hymenaeos. Nulla turpis magna, cursus sit amet, suscipit a,
          interdum id, felis. Nunc auctor. Phasellus rhoncus. Aliquam erat
          volutpat. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus id quod maxime placeat facere possimus,
          omnis voluptas assumenda est, omnis dolor repellendus. Praesent in
          mauris eu tortor porttitor accumsan. Itaque earum rerum hic tenetur a
          sapiente delectus, ut aut reiciendis voluptatibus maiores alias
          consequatur aut perferendis doloribus asperiores repellat.
        </p>
      </div>

      <div>
        <CommonButton
          label="Finish quiz"
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

interface Props {
  questions: QuizQuestion[]
  answers: { [key: number]: number }
  formIsLoading: boolean
}

const props = defineProps<Props>()

const totalAnswersCount = ref<number>(Object.keys(props.answers).length)
const correctAnswersCount = ref<number | null>(null)
const wrongAnswersCount = ref<number | null>(null)

const correctAnswersLength = computed<number>((): number => {
  return Math.round(
    ((correctAnswersCount.value ?? 0) * 100) / totalAnswersCount.value
  )
})
const wrongAnswersLength = computed<number>((): number => {
  return Math.round(
    ((wrongAnswersCount.value ?? 0) * 100) / totalAnswersCount.value
  )
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
