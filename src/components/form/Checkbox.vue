<template>
  <div class="flex items-center">
    <input
      :id="id"
      :name="name"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :value="value"
      type="checkbox"
      class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
      @change="handleInput"
    />
    <label :for="id" class="ml-2 block text-sm text-gray-900">{{
      label
    }}</label>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@nuxtjs/composition-api'

interface Props {
  name: string
  label: string
  value?: boolean // value bind using v-model
  id?: string | null
  required?: boolean
  disabled?: boolean
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: false,
  id: null,
  required: false,
  disabled: false,
  readonly: false
})

// Emits

const emits = defineEmits<{
  (e: 'input', value: boolean): void
}>()

// Computed

const id = computed<string>((): string => props.id ?? props.name)

// Methods

function handleInput(event: Event): void {
  emits('input', (event.target as HTMLInputElement).checked)
}
</script>

<script lang="ts">
export default {
  name: 'FormCheckbox'
}
</script>
