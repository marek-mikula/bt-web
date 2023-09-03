<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transform ease-in duration-100"
    leave-class="opacity-100 sm:translate-x-0 translate-y-0"
    leave-to-class="opacity-0 sm:translate-x-1 translate-y-1 sm:translate-y-0"
  >
    <div
      v-if="active"
      ref="element"
      class="pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5"
    >
      <div
        v-if="progress && timeout"
        :class="[
          'absolute left-0 bottom-0 right-0 h-0.5 rounded',
          {
            'bg-blue-400': isInfo,
            'bg-yellow-400': isWarning,
            'bg-red-400': isError,
            'bg-green-400': isSuccess
          }
        ]"
        :style="progressStyle"
      ></div>
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg
              v-if="isInfo"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 text-blue-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <svg
              v-else-if="isWarning"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 text-yellow-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <svg
              v-else-if="isError"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 text-red-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <svg
              v-else-if="isSuccess"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 text-green-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-gray-900">
              {{ title }}
            </p>
            <p v-if="message" class="mt-1 text-sm text-gray-500">
              {{ message }}
            </p>
          </div>
          <div v-if="closable" class="ml-4 flex flex-shrink-0">
            <button
              type="button"
              class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click.prevent="handleRemove"
            >
              <span class="sr-only">
                {{ $t('common.buttons.close') }}
              </span>
              <svg
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref
} from '@nuxtjs/composition-api'
import { TOAST_TYPE } from '~/enums/common/ToastType'
import { removeElement } from '~/helpers'

const element = ref<HTMLElement | null>(null)
const active = ref<boolean>(false)
const interval = ref<number | null>(null)
const timeLeft = ref<number | null>(null)
const speed = ref<number>(100)

type onRemoveCallback = () => Promise<void>

const props = withDefaults(
  defineProps<{
    type: TOAST_TYPE
    title: string
    message?: string | null
    closable?: boolean
    timeout?: number // time in seconds
    progress?: boolean
    onRemove?: onRemoveCallback | null
  }>(),
  {
    message: null,
    closable: true,
    timeout: 3, // 3s
    progress: false,
    onRemove: null
  }
)

onMounted((): void => {
  active.value = true

  if (props.timeout > 0) {
    timeLeft.value = props.timeout * 1000
    interval.value = window.setInterval((): void => updateTime(), speed.value)
  }
})

onBeforeUnmount((): void => {
  if (interval.value) {
    window.clearInterval(interval.value)
  }
})

const isInfo = computed<boolean>((): boolean => props.type === TOAST_TYPE.INFO)
const isSuccess = computed<boolean>(
  (): boolean => props.type === TOAST_TYPE.SUCCESS
)
const isWarning = computed<boolean>(
  (): boolean => props.type === TOAST_TYPE.WARNING
)
const isError = computed<boolean>(
  (): boolean => props.type === TOAST_TYPE.ERROR
)

const timeLeftPercent = computed<number>((): number =>
  Math.round(
    ((((timeLeft.value ?? 0) * 100) / (props.timeout * 1000)) * 100) / 100
  )
)
const progressStyle = computed<string>(
  (): string =>
    `width: ${timeLeftPercent.value}%; transition: width 0.1s linear;`
)

function updateTime(): void {
  timeLeft.value = (timeLeft.value ?? 0) - speed.value

  if (timeLeft.value <= 0) {
    destroy()
  }
}

function stopInterval(): void {
  if (interval.value) {
    window.clearInterval(interval.value)
  }
}

async function handleRemove(): Promise<void> {
  // stop interval so if the user specifies any
  // onRemove callback, it won't disappear before
  // the callback is called
  stopInterval()

  if (props.onRemove) {
    await props.onRemove()
  }

  destroy()
}

function destroy(): void {
  active.value = false

  stopInterval()

  window.setTimeout((): void => {
    if (element.value) {
      removeElement(element.value)
    }
  }, 1000)
}
</script>

<script lang="ts">
export default {
  name: 'CommonToast'
}
</script>
