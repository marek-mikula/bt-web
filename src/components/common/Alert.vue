<template>
  <div ref="element" :class="['rounded-md p-4', containerClass]">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg
          v-if="type === 'danger'"
          class="h-5 w-5 text-red-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else-if="type === 'warning'"
          class="h-5 w-5 text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else-if="type === 'info'"
          class="h-5 w-5 text-blue-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else
          class="h-5 w-5 text-green-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="ml-3">
        <p v-if="label" :class="['mb-2 text-sm font-medium', labelClass]">
          {{ label }}
        </p>
        <div :class="['text-sm', messageClass]">
          <p v-if="message">
            {{ message }}
          </p>
          <slot v-else>Empty message</slot>
        </div>
      </div>
      <div v-if="closable" class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button
            type="button"
            :class="[
              'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
              closeButtonClass
            ]"
            @click.prevent="handleRemove"
          >
            <span class="sr-only">Dismiss</span>
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
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from '@nuxtjs/composition-api'
import { removeElement } from '~/helpers'

const element = ref<HTMLElement | null>(null)
const active = ref<boolean>(false)

const props = withDefaults(
  defineProps<{
    message?: string | null
    type?: 'success' | 'danger' | 'warning' | 'info'
    label?: string | null
    closable?: boolean
  }>(),
  {
    message: null,
    type: 'success',
    label: null,
    closable: false
  }
)

const containerClass = computed<string>((): string => {
  switch (props.type) {
    case 'danger':
      return 'bg-red-50'
    case 'warning':
      return 'bg-yellow-50'
    case 'info':
      return 'bg-blue-50'
    default:
      return 'bg-green-50'
  }
})

const messageClass = computed<string>((): string => {
  switch (props.type) {
    case 'danger':
      return 'text-red-700'
    case 'warning':
      return 'text-yellow-700'
    case 'info':
      return 'text-blue-700'
    default:
      return 'text-green-700'
  }
})

const labelClass = computed<string>((): string => {
  switch (props.type) {
    case 'danger':
      return 'text-red-800'
    case 'warning':
      return 'text-yellow-800'
    case 'info':
      return 'text-blue-800'
    default:
      return 'text-green-800'
  }
})

const closeButtonClass = computed<string>((): string => {
  switch (props.type) {
    case 'danger':
      return 'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50'
    case 'warning':
      return 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50'
    case 'info':
      return 'bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50'
    default:
      return 'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50'
  }
})

onMounted((): void => {
  active.value = true
})

const emit = defineEmits<{
  (e: 'removed'): void
}>()

function handleRemove(): void {
  if (!props.closable) {
    return
  }

  if (element.value) {
    removeElement(element.value)
  }

  emit('removed')

  active.value = false
}
</script>

<script lang="ts">
export default {
  name: 'CommonAlert'
}
</script>
