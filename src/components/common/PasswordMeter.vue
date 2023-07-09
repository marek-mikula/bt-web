<template>
  <PasswordMeter
    ref="element"
    :value="value"
    :strength-meter-only="true"
    :strength-meter-class="'relative my-2 rounded h-1 bg-gray-300'"
  />
</template>

<script setup lang="ts">
import { ref, watch } from '@nuxtjs/composition-api'
import colors from 'tailwindcss/colors'

const element = ref<any | null>(null)

const props = defineProps<{
  value?: string | number | null
}>()

// custom coloring based on the theme from tailwind
// because plugin does not let me change the colors :(
watch(
  () => props.value,
  (): void => {
    const meter: HTMLElement | null = element.value?.$el.querySelector(
      '.Password__strength-meter--fill'
    )

    if (meter) {
      const score = meter.getAttribute('data-score')

      let color = null

      switch (score) {
        case null:
        case '0':
          color = colors.red['600']
          break
        case '1':
          color = colors.orange['600']
          break
        case '2':
          color = colors.yellow['600']
          break
        case '3':
          color = colors.purple['600']
          break
        case '4':
          color = colors.green['600']
          break
      }

      meter.style.background = color || ''
    }
  }
)
</script>

<script lang="ts">
export default {
  name: 'CommonPasswordMeter'
}
</script>

<style scoped>
.Password {
  max-width: unset;
}

.Password__strength-meter--fill[data-score='0'] {
  background: none;
}

.Password__strength-meter--fill[data-score='1'] {
  background: none;
}

.Password__strength-meter--fill[data-score='2'] {
  background: none;
}

.Password__strength-meter--fill[data-score='3'] {
  background: none;
}

.Password__strength-meter--fill[data-score='4'] {
  background: none;
}
</style>
