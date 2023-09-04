<template>
  <div>
    <div class="flex items-center">
      <input
        :id="id"
        :name="name"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :checked="value"
        type="checkbox"
        class="h-4 w-4 rounded border-gray-200 text-indigo-600 focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:ring-0 disabled:hover:bg-gray-300"
        @change="handleInput"
      />
      <label
        v-if="label"
        :for="id"
        :class="{
          'ml-2 block text-sm font-medium leading-6 text-gray-900':
            !labelHidden,
          'sr-only': labelHidden
        }"
        v-html="renderLabel(label, required)"
      ></label>
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
    label?: string | null
    value?: boolean // value bind using v-model
    id?: string | null
    required?: boolean
    disabled?: boolean
    readonly?: boolean
    hint?: string | null
    error?: string | null
    labelHidden?: boolean
  }>(),
  {
    label: null,
    value: false,
    id: null,
    required: false,
    disabled: false,
    readonly: false,
    hint: null,
    error: null,
    labelHidden: false
  }
)

const emit = defineEmits<{
  (e: 'input', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const id = computed<string>((): string => props.id ?? props.name)
const hintId = computed<string>((): string => `${id.value}-hint`)
const errorId = computed<string>((): string => `${id.value}-error`)
const hasError = computed<boolean>((): boolean => !!props.error)

function handleInput(event: Event): void {
  emit('input', (event.target as HTMLInputElement).checked)
  emit('change', (event.target as HTMLInputElement).checked)
}
</script>

<script lang="ts">
export default {
  name: 'FormCheckbox'
}
</script>
