<template>
  <div>
    <!-- page header -->
    <div class="mb-5">
      <h2
        class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
      >
        {{ $t('pages.user.settings.title') }}
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
              'flex rounded-md px-3 py-2 text-sm font-medium',
              {
                'bg-indigo-100 text-indigo-700': tab === currentTab,
                'bg-gray-100 text-gray-500 hover:text-gray-700':
                  tab !== currentTab
              }
            ]"
            :aria-current="tab === currentTab ? 'page' : null"
            @click.prevent="redirect(tab)"
          >
            <svg
              v-if="tab === 'alerts'"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="mr-1 h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <svg
              v-else-if="tab === 'notifications'"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="mr-1 h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
              />
            </svg>
            <svg
              v-else-if="tab === 'limits'"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="mr-1 h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
            <svg
              v-else-if="tab === 'account'"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="mr-1 h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            {{ $t(`pages.user.settings.tabs.${tab}`) }}
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
      label: i18n.t(`pages.user.settings.tabs.${tab}`).toString()
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
