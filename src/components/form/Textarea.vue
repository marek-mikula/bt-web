<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium leading-6 text-gray-900"
      v-html="renderLabel(label, required)"
    ></label>
    <div class="mt-2">
      <textarea
        :id="id"
        :name="name"
        :required="required"
        :readonly="readonly"
        :disabled="disabled"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :rows="rows"
        class="block w-full resize-none rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
        @input="handleInput"
      ></textarea>
    </div>
    <p v-if="hint" :id="hintId" class="mt-2 text-sm text-gray-500">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useField } from '~/composables/forms/field'

const { renderLabel } = useField()

interface Props {
  name: string
  value?: string | number | null // value bind using v-model
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
}

const props = withDefaults(defineProps<Props>(), {
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
  rows: 5
})

const emit = defineEmits<{
  (e: 'input', value: string | number | null): void
}>()

const id = computed<string>((): string => props.id ?? props.name)
const hintId = computed<string>((): string => `${id.value}-hint`)

function handleInput(event: Event): void {
  emit('input', (event.target as HTMLInputElement).value)
}
</script>

<script lang="ts">
export default {
  name: 'FormTextarea'
}
</script>
