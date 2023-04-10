<template>
  <button :type="type" :class="classList" @click="handleClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 1 | 2 | 3 | 4 | 5 // 1 - smallest, 5 - biggest,
  color?: 'primary' | 'secondary'
  rounded?: boolean
  soft?: boolean
  block?: boolean
  type?: 'button' | 'submit'
}

const props = withDefaults(defineProps<Props>(), {
  size: 3,
  color: 'primary',
  rounded: false,
  soft: false,
  block: false,
  type: 'button'
})

const classList = computed<string[]>((): string[] => {
  const list = ['font-semibold', 'shadow-sm']

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
  }

  if (props.block) {
    list.push('flex', 'w-full', 'justify-center')
  }

  return list
})

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