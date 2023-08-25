<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium leading-6 text-gray-900"
      v-html="renderLabel(label, required)"
    ></label>
    <select
      :id="id"
      :name="name"
      :autocomplete="autocomplete"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :class="[
        'mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 sm:text-sm sm:leading-6',
        {
          'text-red-900 ring-1 ring-inset ring-red-300 focus:ring-2 focus:ring-inset focus:ring-red-600':
            hasError,
          'text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 ':
            !hasError
        }
      ]"
      @input="handleInput"
    >
      <option
        v-for="v in values"
        :key="v.value"
        :value="v.value"
        :selected="value === v.value"
      >
        {{ v.label }}
      </option>
    </select>
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
    values: {
      value: string | number
      label: string | number
    }[]
    value?: string | number | null // value bind using v-model
    id?: string | null
    label?: string | null
    required?: boolean
    disabled?: boolean
    readonly?: boolean
    autocomplete?: string
    hint?: string | null
    error?: string | null
  }>(),
  {
    value: null,
    id: null,
    label: null,
    required: false,
    disabled: false,
    readonly: false,
    autocomplete: 'off',
    hint: null,
    error: null
  }
)

const emit = defineEmits<{
  (e: 'input', value: string | number | null): void
}>()

const id = computed<string>((): string => props.id ?? props.name)
const hintId = computed<string>((): string => `${id.value}-hint`)
const errorId = computed<string>((): string => `${id.value}-error`)
const hasError = computed<boolean>((): boolean => !!props.error)

function handleInput(event: Event): void {
  emit('input', (event.target as HTMLInputElement).value)
}
</script>

<script lang="ts">
export default {
  name: 'FormSelect'
}
</script>
