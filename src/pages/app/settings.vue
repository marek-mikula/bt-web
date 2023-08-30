<template>
  <div>
    <!-- title header -->
    <div class="mb-5">
      <h2
        class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
      >
        {{ $t('pages.settings.title') }}
      </h2>
    </div>

    <!-- nav pills navigation -->
    <div class="mb-5">
      <div class="sm:hidden">
        <FormSelect
          :id="'settings-tab'"
          :value="currentTab"
          :name="'settingsTab'"
          :options="selectOptions"
          label-hidden
          :label="'Select a tab'"
          @change="redirect"
        />
      </div>
      <div class="hidden sm:block">
        <nav class="flex space-x-4" aria-label="Tabs">
          <a
            v-for="tab in tabs"
            :key="tab"
            href="#"
            :class="[
              'rounded-md px-3 py-2 text-sm font-medium',
              {
                'bg-indigo-100 text-indigo-700': tab === currentTab,
                'bg-gray-100 text-gray-500 hover:text-gray-700':
                  tab !== currentTab
              }
            ]"
            :aria-current="tab === currentTab ? 'page' : null"
            @click.prevent="redirect(tab)"
          >
            {{ $t(`pages.settings.tabs.${tab}`) }}
          </a>
        </nav>
      </div>
    </div>

    <div>
      <NuxtChild keep-alive />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  useContext,
  useRoute,
  useRouter
} from '@nuxtjs/composition-api'
import { SETTINGS_TAB } from '~/enums/settings/SettingsTab'
import { FormSelectOption } from '~/types/common/Form'

const { i18n } = useContext()
const router = useRouter()
const route = useRoute()

const currentTab = computed<string>((): string => {
  const { path } = route.value
  return path.substring(path.lastIndexOf('/') + 1)
})

const tabs = computed<SETTINGS_TAB[]>((): SETTINGS_TAB[] =>
  Object.values(SETTINGS_TAB)
)

const selectOptions = computed<FormSelectOption[]>((): FormSelectOption[] =>
  tabs.value.map(
    (tab: SETTINGS_TAB): FormSelectOption => ({
      value: tab,
      label: i18n.t(`pages.settings.tabs.${tab}`).toString()
    })
  )
)

async function redirect(tab: SETTINGS_TAB): Promise<void> {
  await router.push({ path: `/app/settings/${tab}` })
}
</script>

<script lang="ts">
export default {
  name: 'AppSettingsPage',
  layout: 'app'
}
</script>
