<template>
  <div>
    <label
      v-if="label"
      :for="id"
      :class="{
        'block text-sm font-medium leading-6 text-gray-900': !labelHidden,
        'sr-only': labelHidden
      }"
      v-html="renderLabel(label, required)"
    ></label>
    <div
      :class="[
        'mt-2',
        {
          'rounded-md shadow-sm': hasError,
          relative: hasError || (showCounter && maxlength)
        }
      ]"
    >
      <textarea
        :id="id"
        :name="name"
        :value="value"
        :required="required"
        :readonly="readonly"
        :disabled="disabled"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :rows="rows"
        :class="[
          'block w-full resize-none  rounded-md border-0 text-gray-900 shadow-sm sm:py-1.5 sm:text-sm sm:leading-6',
          {
            'pr-10 ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600':
              hasError,
            'ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600':
              !hasError
          }
        ]"
        @input="handleInput"
      ></textarea>
      <div
        v-if="showCounter && maxlength"
        class="absolute right-2 bottom-2 text-xxs font-semibold"
      >
        {{ textLength }} / {{ maxlength }}
      </div>
      <div
        v-if="hasError"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <svg
          class="h-5 w-5 text-red-500"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
    <p v-if="hasError" :id="errorId" class="mt-2 text-sm text-red-500">
      {{ error }}
    </p>
    <p v-if="hint" :id="hintId" class="mt-2 text-sm text-gray-500">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@nuxtjs/composition-api'
import { useField } from '~/composables/forms/field'

const { renderLabel } = useField()

const props = withDefaults(
  defineProps<{
    name: string
    value?: string | null // value bind using v-model
    id?: string | null
    label?: string | null
    required?: boolean
    disabled?: boolean
    readonly?: boolean
    autocomplete?: string
    maxlength?: number | null
    hint?: string | null
    placeholder?: string | null
    rows?: number | null
    error?: string | null
    labelHidden?: boolean
    showCounter?: boolean
  }>(),
  {
    value: null,
    id: null,
    label: null,
    required: false,
    disabled: false,
    readonly: false,
    autocomplete: 'off',
    maxlength: null,
    hint: null,
    placeholder: null,
    rows: 5,
    error: null,
    labelHidden: false,
    showCounter: false
  }
)

const emit = defineEmits<{
  (e: 'input', value: string | number | null): void
}>()

const id = computed<string>((): string => props.id ?? props.name)
const hintId = computed<string>((): string => `${id.value}-hint`)
const errorId = computed<string>((): string => `${id.value}-error`)
const hasError = computed<boolean>((): boolean => !!props.error)

const textLength = computed<number>((): number =>
  props.showCounter ? props.value?.length ?? 0 : 0
)

function handleInput(event: Event): void {
  emit('input', (event.target as HTMLInputElement).value)
}
</script>

<script lang="ts">
export default {
  name: 'FormTextarea'
}
</script>
