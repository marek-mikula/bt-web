<template>
  <div>
    <slot
      name="button"
      v-bind="{
        toggle,
        state,
        identifier,
        handleClick
      }"
    />
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="state"
        ref="element"
        :class="classList"
        role="menu"
        aria-orientation="vertical"
        :aria-labelledby="identifier"
        tabindex="-1"
      >
        <slot
          name="list"
          v-bind="{
            toggle,
            state,
            identifier,
            handleClick
          }"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeUnmount, watch } from '@nuxtjs/composition-api'
import { delay } from '~/helpers'

const props = withDefaults(
  defineProps<{
    identifier: string
    horizontal: 'left' | 'right'
    vertical: 'bottom' | 'top'
    width?: 32 | 36 | 40 | 44 | 48
  }>(),
  {
    width: 32
  }
)

const state = ref<boolean>(false)
const element = ref<HTMLElement | null>(null)

let positionClass = ''

if (props.horizontal === 'left' && props.vertical === 'bottom') {
  positionClass = 'origin-top-left left-0 mt-2'
} else if (props.horizontal === 'right' && props.vertical === 'bottom') {
  positionClass = 'origin-top-right right-0 mt-2'
} else if (props.horizontal === 'left' && props.vertical === 'top') {
  positionClass = 'origin-bottom-left left-0 bottom-[100%] mb-2'
} else {
  positionClass = 'origin-bottom-right right-0 bottom-[100%] mb-2'
}

// w-32
// w-36
// w-40
// w-44
// w-48
const widthClass = `w-${props.width}`

const classList = [
  'absolute',
  'z-10',
  widthClass,
  'rounded-md',
  'bg-white',
  // 'py-2',
  'shadow-lg',
  'ring-1',
  'ring-gray-200',
  'focus:outline-none',
  positionClass
]

async function handleClick(
  handler: ((...args: any) => void) | ((...args: any) => Promise<void>),
  ...args: any
): Promise<void> {
  await handler(...args)
  toggle(false)
}

function toggle(value: boolean): void {
  state.value = value
}

function closeIfNeeded(e: Event): void {
  if (!state.value) {
    return
  }

  const target = e.target as HTMLElement

  if (target !== element.value && !element.value?.contains(target)) {
    toggle(false)
  }
}

// watch state change, when the dropdown shows, attach
// event so when user clicks outside, the dropdown gets closed
watch(
  () => state.value,
  (val: boolean) => {
    if (val) {
      // delay event attaching, so it does not get closed
      // asap because of race condition
      delay(50).then((): void => {
        document.body.addEventListener('click', closeIfNeeded)
      })
    } else {
      document.body.removeEventListener('click', closeIfNeeded)
    }
  }
)

onBeforeUnmount((): void => {
  document.body.removeEventListener('click', closeIfNeeded)
})
</script>

<script lang="ts">
export default {
  name: 'CommonDropdown'
}
</script>
