<template>
  <div>
    <label
      v-if="label"
      for="password"
      class="block text-sm font-medium leading-6 text-gray-900"
      >{{ label }}</label
    >
    <div class="mt-2">
      <input
        :id="id"
        :name="name"
        :type="type"
        :autocomplete="autocomplete"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :min="min"
        :max="max"
        :placeholder="placeholder"
        class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
      />
    </div>
    <p v-if="hint" :id="hintId" class="mt-2 text-sm text-gray-500">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type:
    | 'color'
    | 'date'
    | 'datetime'
    | 'email'
    | 'file'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
  name: string
  id?: string | null
  label?: string | null
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  autocomplete?: string
  maxlength?: number | null
  min?: number | null
  max?: number | null
  hint?: string | null
  placeholder?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  id: null,
  label: null,
  required: false,
  disabled: false,
  readonly: false,
  autocomplete: 'off',
  maxlength: null,
  min: null,
  max: null,
  hint: null,
  placeholder: null
})

const id = computed<string>((): string => props.id ?? props.name)
const hintId = computed<string>((): string => `${id.value}-hint`)
</script>

<script lang="ts">
export default {
  name: 'FormInput'
}
</script>
