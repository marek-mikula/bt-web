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
    <label
      :for="id"
      :class="{
        'ml-2 block text-sm text-gray-900': !labelHidden,
        'sr-only': labelHidden
      }"
      v-html="renderLabel(label, required)"
    ></label>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@nuxtjs/composition-api'
import { useField } from '~/composables/forms/field'

const { renderLabel } = useField()

const props = withDefaults(
  defineProps<{
    name: string
    label: string
    value?: boolean // value bind using v-model
    id?: string | null
    required?: boolean
    disabled?: boolean
    readonly?: boolean
    labelHidden?: boolean
  }>(),
  {
    value: false,
    id: null,
    required: false,
    disabled: false,
    readonly: false,
    labelHidden: false
  }
)

const emit = defineEmits<{
  (e: 'input', value: boolean): void
}>()

const id = computed<string>((): string => props.id ?? props.name)

function handleInput(event: Event): void {
  emit('input', (event.target as HTMLInputElement).checked)
}
</script>

<script lang="ts">
export default {
  name: 'FormCheckbox'
}
</script>
