<template>
  <button
    :type="type"
    :class="classList"
    :disabled="isLoading || disabled"
    @click="handleClick"
  >
    <span v-if="isLoading">
      {{ $t('common.buttons.loading').toString() + loadingText }}
    </span>
    <template v-else-if="$slots['default']">
      <slot></slot>
    </template>
    <span v-else>
      {{ label }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from '@nuxtjs/composition-api'

const props = withDefaults(
  defineProps<{
    label?: string | null
    size?: 1 | 2 | 3 | 4 | 5 // 1 - smallest, 5 - biggest,
    color?: 'primary' | 'secondary' | 'success' | 'danger'
    rounded?: boolean
    soft?: boolean
    block?: boolean
    type?: 'button' | 'submit'
    disabled?: boolean
    isLoading?: boolean
  }>(),
  {
    label: null,
    size: 3,
    color: 'primary',
    rounded: false,
    soft: false,
    block: false,
    type: 'button',
    disabled: false,
    isLoading: false
  }
)

const loadingInterval = ref<number | null>(null)
const loadingText = ref<string>('')

const classList = computed<string[]>((): string[] => {
  const list = [
    'font-semibold',
    'shadow-sm',
    'disabled:cursor-not-allowed',
    'disabled:bg-gray-50',
    'disabled:text-gray-500'
  ]

  // add size classes
  switch (props.size) {
    case 1:
      list.push('px-2', 'py-1', 'text-xs')
      break
    case 2:
      list.push('px-2', 'py-1', 'text-sm')
      break
    case 3:
      list.push('px-2.5', 'py-1.5', 'text-sm')
      break
    case 4:
      list.push('px-3', 'py-2', 'text-sm')
      break
    case 5:
      list.push('px-3.5', 'py-2.5', 'text-sm')
      break
  }

  // add rounded classes
  if (props.rounded) {
    list.push('rounded-full')
  } else {
    switch (props.size) {
      case 1:
      case 2:
        list.push('rounded')
        break
      case 3:
      case 4:
      case 5:
        list.push('rounded-md')
        break
    }
  }

  // add color classes
  switch (props.color) {
    case 'primary':
      list.push(
        'bg-indigo-600',
        'text-white',
        'hover:bg-indigo-500',
        'focus-visible:outline',
        'focus-visible:outline-2',
        'focus-visible:outline-offset-2',
        'focus-visible:outline-indigo-600'
      )
      break
    case 'secondary':
      list.push(
        'bg-white',
        'text-gray-900',
        'ring-1',
        'ring-inset',
        'ring-gray-300',
        'hover:bg-gray-50'
      )
      break
    case 'success':
      list.push(
        'bg-green-600',
        'text-white',
        'hover:bg-green-500',
        'focus-visible:outline',
        'focus-visible:outline-2',
        'focus-visible:outline-offset-2',
        'focus-visible:outline-green-600'
      )
      break
    case 'danger':
      list.push(
        'bg-red-600',
        'text-white',
        'hover:bg-red-500',
        'focus-visible:outline',
        'focus-visible:outline-2',
        'focus-visible:outline-offset-2',
        'focus-visible:outline-red-600'
      )
      break
  }

  if (props.block) {
    list.push('flex', 'w-full', 'justify-center')
  }

  return list
})

if (process.browser) {
  watch(
    () => props.isLoading,
    (current: boolean) => {
      if (current) {
        loadingInterval.value = window.setInterval(() => {
          loadingText.value =
            loadingText.value.length >= 3 ? '' : loadingText.value + '.'
        }, 500)
      } else if (loadingInterval.value) {
        window.clearInterval(loadingInterval.value)
      }
    },
    {
      immediate: true
    }
  )

  onBeforeUnmount((): void => {
    if (loadingInterval.value) {
      window.clearInterval(loadingInterval.value)
    }
  })
}

const emit = defineEmits<{
  (e: 'click'): void
}>()

function handleClick(): void {
  emit('click')
}
</script>

<script lang="ts">
export default {
  name: 'CommonButton'
}
</script>
