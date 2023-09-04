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
    <select
      :id="id"
      :name="name"
      :value="value"
      :autocomplete="autocomplete"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :class="[
        'mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6',
        {
          'text-red-900 ring-1 ring-inset ring-red-300 focus:ring-2 focus:ring-inset focus:ring-red-600':
            hasError,
          'text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 ':
            !hasError
        }
      ]"
      @input="handleInput"
      @change="handleChange"
    >
      <option v-if="addEmptyOption" :value="null">
        {{ $t('common.select.emptyOption') }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
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
import { FormSelectOption } from '~/types/common/Form'

const { renderLabel } = useField()

const props = withDefaults(
  defineProps<{
    name: string
    options: FormSelectOption[]
    value?: string | number | null // value bind using v-model
    id?: string | null
    label?: string | null
    required?: boolean
    disabled?: boolean
    readonly?: boolean
    autocomplete?: string
    hint?: string | null
    error?: string | null
    labelHidden?: boolean
    addEmptyOption?: boolean
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
    error: null,
    labelHidden: false,
    addEmptyOption: true
  }
)

const emit = defineEmits<{
  (e: 'input', value: string | number | null): void
  (e: 'change', value: string | number | null): void
}>()

const id = computed<string>((): string => props.id ?? props.name)
const hintId = computed<string>((): string => `${id.value}-hint`)
const errorId = computed<string>((): string => `${id.value}-error`)
const hasError = computed<boolean>((): boolean => !!props.error)

function handleInput(event: Event): void {
  emit('input', (event.target as HTMLInputElement).value || null)
}

function handleChange(event: Event): void {
  emit('change', (event.target as HTMLInputElement).value || null)
}
</script>

<script lang="ts">
export default {
  name: 'FormSelect'
}
</script>
