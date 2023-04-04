<template>
  <div>
    <label
      v-if="label"
      for="password"
      class="mb-1 block text-sm font-medium leading-6 text-gray-900"
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
        class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
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
  max: null
})

const id = computed<string>((): string => props.id ?? props.name)
</script>

<script lang="ts">
export default {
  name: 'FormInput'
}
</script>