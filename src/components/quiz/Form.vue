<template>
  <div class="mx-auto max-w-lg overflow-hidden rounded-lg bg-white shadow">
    <!-- List of answers and question texts -->
    <template v-if="isInProgressState">
      <QuizStep
        :questions="questions"
        :current-question="currentQuestion"
        :current-answer="currentAnswer"
        @selected="selectAnswer"
        @next="stepNext"
        @back="stepBack"
      />
    </template>

    <!-- Ending text -->
    <template v-else-if="isInFinishedState">
      <QuizEnd
        :questions="questions"
        :answers="answers"
        :form-is-loading="isLoading"
        @finish="finish"
      />
    </template>

    <!-- Starting informational text -->
    <template v-else>
      <QuizStart @start="stepNext" />
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
  useContext,
  useStore
} from '@nuxtjs/composition-api'
import Vue from 'vue'
import { useLoading } from '~/composables/loading'
import { FinishForm } from '~/types/forms/Quiz'
import { NumberMap } from '~/types/common/Common'
import { QuizAnswer, QuizQuestion } from '~/types/http/Entities'
import { useRedirect } from '~/composables/redirect'

const { redirect } = useRedirect()
const context = useContext()
const { $repositories, $toast, i18n } = context
const { isLoading, setIsLoading } = useLoading()
const store = useStore()

const LOCAL_STORAGE_KEY = 'quiz-answers'

enum State {
  DEFAULT = 1,
  IN_PROGRESS = 2,
  FINISHED = 3
}

const props = defineProps<{
  questions: QuizQuestion[]
}>()

const answers = ref<NumberMap<number>>({})

// quiz state
const state = ref<State>(State.DEFAULT)

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
      props.questions.find(
        (question: QuizQuestion) => question.id === currentQuestionId.value
      ) || null
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

function selectAnswer(answer: QuizAnswer): void {
  if (!currentQuestionId.value) {
    return
  }

  Vue.set(answers.value, currentQuestionId.value, answer.id)
}

function getPreviousQuestion(): QuizQuestion | null {
  return (
    props.questions.find(
      (question) => question.id + 1 === currentQuestionId.value
    ) || null
  )
}

function getNextQuestion(): QuizQuestion | null {
  return (
    props.questions.find(
      (question) => (currentQuestionId.value ?? 0) + 1 === question.id
    ) || null
  )
}

async function finish(): Promise<void> {
  setIsLoading(true)

  try {
    const form: FinishForm = {
      answers: []
    }

    // map answers object to form data
    Object.entries(answers.value).forEach(([key, value]: [string, number]) => {
      form.answers.push({
        id: parseInt(key),
        answer: value
      })
    })

    await $repositories.quiz.finish(form)

    await store.dispatch('auth/fetchUser', context) // update user model

    removeProgress() // remove progress from local storage

    $toast.success({
      title: i18n.t('toasts.quiz.success').toString()
    })

    await redirect({ path: '/app' })
  } catch (e: any) {
    $toast.error({
      title: i18n.t('toasts.common.somethingWentWrong').toString()
    })
  } finally {
    setIsLoading(false)
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

  currentQuestionId.value = previousQuestion?.id || null
}

function stepNext(): void {
  const nextQuestion = getNextQuestion()

  // save progress
  saveProgress(answers.value)

  // update quiz state if this was the end of the quiz
  if (!nextQuestion) {
    state.value = State.FINISHED

    return
  }

  const isStart = !currentQuestionId.value

  currentQuestionId.value = nextQuestion.id

  // update quiz state if this was the start of the quiz
  if (isStart) {
    state.value = State.IN_PROGRESS
  }
}

function loadProgress(): NumberMap<number> | null {
  let value = localStorage.getItem(LOCAL_STORAGE_KEY)

  if (!value) {
    return null
  }

  value = JSON.parse(value)

  if (typeof value !== 'object') {
    return null
  }

  return value as any as NumberMap<number>
}

function removeProgress(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY)
}

function saveProgress(answers: NumberMap<number>): void {
  if (!Object.keys(answers).length) {
    localStorage.removeItem(LOCAL_STORAGE_KEY)

    return
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(answers))
}

// set current step based on value from local storage
onMounted((): void => {
  const progress = loadProgress()

  if (!progress) {
    return
  }

  answers.value = progress

  // user has completed the quiz already
  if (Object.keys(answers.value).length === props.questions.length) {
    state.value = State.FINISHED

    return
  }

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
