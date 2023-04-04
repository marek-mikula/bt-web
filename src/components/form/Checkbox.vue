<template>
  <div class="flex items-center">
    <input
      :id="id"
      :name="name"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      type="checkbox"
      class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
    />
    <label :for="id" class="ml-2 block text-sm text-gray-900">{{
      label
    }}</label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  label: string
  id?: string | null
  required?: boolean
  disabled?: boolean
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: null,
  required: false,
  disabled: false,
  readonly: false
})

const id = computed<string>((): string => props.id ?? props.name)
</script>

<script lang="ts">
export default {
  name: 'FormCheckbox'
}
</script>
