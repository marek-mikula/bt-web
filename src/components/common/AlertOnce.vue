<template>
  <CommonAlert v-if="visible" v-bind="passedProps">
    <!-- pass all slots to child component -->
    <template v-for="(_, slot) of $scopedSlots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </CommonAlert>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useContext } from '@nuxtjs/composition-api'
import { AlertAction } from '~/types/common/Alert'

const { $_ } = useContext()

const props = withDefaults(
  defineProps<{
    identifier: string
    message?: string | null
    type?: 'success' | 'danger' | 'warning' | 'info'
    label?: string | null
    actions?: AlertAction[]
  }>(),
  {
    message: null,
    type: 'success',
    label: null,
    actions: () => []
  }
)

// pass given props to Alert components but
// prepend "I understand" action.
const passedProps = computed(() => ({
  ...$_.omit(props, 'actions'),
  ...{
    closable: false,
    actions: (
      [
        {
          label: {
            key: 'common.buttons.understand'
          },
          handler: handleRemoved
        }
      ] as AlertAction[]
    ).concat(props.actions)
  }
}))

const visible = ref<boolean>(false)

function handleRemoved(): void {
  localStorage.setItem(props.identifier, '1')

  visible.value = false
}

if (process.browser) {
  onMounted((): void => {
    visible.value = localStorage.getItem(props.identifier) !== '1'
  })
}
</script>

<script lang="ts">
export default {
  name: 'CommonAlertOnce'
}
</script>
