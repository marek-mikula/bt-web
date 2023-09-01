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
    <div class="mt-2 flex items-center">
      <span class="mr-2 text-sm text-gray-300">
        <template v-if="unit">
          {{ value === null ? min : value }}&nbsp;{{ unit }}
        </template>
        <template v-else>
          {{ value === null ? min : value }}
        </template>
      </span>
      <input
        :id="id"
        :name="name"
        :required="required"
        :value="value === null ? min : value"
        :readonly="readonly"
        :disabled="disabled"
        :min="min"
        :max="max"
        :step="step"
        type="range"
        class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-indigo-600 disabled:cursor-not-allowed disabled:accent-gray-500"
        @input="handleInput"
      />
      <span class="ml-2 text-sm text-gray-300">
        {{ unit ? `${max}&nbsp;${unit}` : max }}
      </span>
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
import { computed, onMounted, watch } from '@nuxtjs/composition-api'
import { useField } from '~/composables/forms/field'

const { renderLabel } = useField()

const props = withDefaults(
  defineProps<{
    name: string
    min?: number
    max?: number
    step?: number
    label?: string | null
    value?: number | null // value bind using v-model
    unit?: string | null
    id?: string | null
    hint?: string | null
    error?: string | null
    required?: boolean
    disabled?: boolean
    readonly?: boolean
    labelHidden?: boolean
  }>(),
  {
    min: 0,
    max: 5,
    step: 0.5,
    label: null,
    value: null,
    unit: null,
    id: null,
    hint: null,
    error: null,
    required: false,
    disabled: false,
    readonly: false,
    labelHidden: false
  }
)

const emit = defineEmits<{
  (e: 'input', value: number): void
}>()

const id = computed<string>((): string => props.id ?? props.name)
const hintId = computed<string>((): string => `${id.value}-hint`)
const errorId = computed<string>((): string => `${id.value}-error`)
const hasError = computed<boolean>((): boolean => !!props.error)

function handleInput(event: Event): void {
  emit('input', (event.target as HTMLInputElement).valueAsNumber)
}

// if user enables the slider with some of his actions
// we want to set the current value as the minimum so
// the value would match with what he sees
watch(
  () => props.disabled,
  (value: boolean): void => {
    if (!value) {
      emit('input', props.min)
    }
  }
)

onMounted((): void => {
  // if the slider is rendered and is not disabled
  // and has no value, set minimum value as the
  // current value
  if (!props.disabled && props.value === null) {
    emit('input', props.min)
  }
})
</script>

<script lang="ts">
export default {
  name: 'FormSlider'
}
</script>
