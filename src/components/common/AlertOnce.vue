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
import { useUser } from '~/composables/user'

const { $_ } = useContext()
const { getNullableUser } = useUser()

const user = getNullableUser()

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
const path = computed<string>(() =>
  user.value
    ? `${user.value.id}.${props.identifier}`
    : `guest.${props.identifier}`
)

function getObject(): { [key: string]: string } {
  const jsonString = localStorage.getItem('alerts_once')

  let json

  try {
    json = jsonString ? JSON.parse(jsonString) : {}
  } catch (e) {
    json = {}
  }

  return json
}

function saveState(): void {
  localStorage.setItem(
    'alerts_once',
    JSON.stringify($_.set(getObject(), path.value, '1'))
  )
}

function getState(): boolean {
  return $_.get(getObject(), path.value) !== '1'
}

function handleRemoved(): void {
  saveState()
  visible.value = false
}

if (process.browser) {
  onMounted((): void => {
    visible.value = getState()
  })
}
</script>

<script lang="ts">
export default {
  name: 'CommonAlertOnce'
}
</script>
