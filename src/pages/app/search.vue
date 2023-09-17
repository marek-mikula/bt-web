<template>
  <div>
    <!-- loading spinner -->
    <div
      v-if="isLoading"
      class="flex items-center justify-center rounded border-2 border-dashed border-indigo-50 p-5 md:rounded-lg"
    >
      <CommonSpinner :type="'primary'" :size="12" />
    </div>

    <!-- results list -->
    <div v-else-if="results !== null">
      <div v-if="results.length > 0" class="mb-2">
        <p class="text-xs text-gray-500">
          {{ $tc('common.table.found', results.length) }}
        </p>
      </div>

      <ul
        role="list"
        class="divide-y divide-gray-200 overflow-hidden rounded bg-white shadow-sm ring-1 ring-gray-200 md:rounded-lg"
      >
        <!-- empty state -->
        <li
          v-if="results.length === 0"
          class="flex items-center justify-center px-4 py-5 text-gray-500 sm:px-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-2 h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <p class="text-center text-sm">
            {{ $t('pages.search.empty', { query }) }}
          </p>
        </li>

        <template v-else>
          <li
            v-for="result in results"
            :key="result.id"
            class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
          >
            <div class="flex min-w-0 gap-x-4">
              <img
                class="h-12 w-12 flex-none rounded-full bg-gray-50"
                :src="result.logo"
                :alt="result.name + ' logo'"
              />
              <div class="flex min-w-0 flex-auto items-center sm:block">
                <p class="text-sm font-semibold leading-6 text-gray-900">
                  <a
                    href="#"
                    @click.prevent="
                      redirect({ path: `/app/cryptocurrencies/${result.id}` })
                    "
                  >
                    <span class="absolute inset-x-0 -top-px bottom-0"></span>
                    {{ result.symbol }} - {{ result.name }}
                  </a>
                </p>
                <p
                  class="mt-1 flex hidden text-justify text-xs leading-5 text-gray-500 sm:block"
                >
                  {{ $_.truncate(result.description, { length: 200 }) }}
                </p>
              </div>
            </div>

            <div class="flex shrink-0 items-center gap-x-4">
              <div class="sm:flex sm:flex-col sm:items-end">
                <p class="text-sm leading-6 text-gray-900">
                  {{ formatCurrency(result.price, result.priceCurrency) }}
                </p>
              </div>
              <svg
                class="h-5 w-5 flex-none text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  useContext,
  useRoute,
  watch
} from '@nuxtjs/composition-api'
import { useLoading } from '~/composables/loading'
import { SearchResult } from '~/types/http/Entities'
import { useFormat } from '~/composables/format'
import { useRedirect } from '~/composables/redirect'

const { $repositories, $toast, i18n } = useContext()
const { redirect } = useRedirect()
const { isLoading, setIsLoading } = useLoading()
const route = useRoute()
const { formatCurrency } = useFormat()

const results = ref<SearchResult[] | null>(null)

const query = computed<string>(
  (): string => (route.value.query.q || '') as string
)

async function fetchResults(): Promise<void> {
  setIsLoading(true)

  try {
    results.value = await $repositories.search
      .search(query.value)
      .then((response) => response.data.data.results)
  } catch (e: any) {
    $toast.error({
      title: i18n.t('toasts.common.somethingWentWrong').toString()
    })
  } finally {
    setIsLoading(false)
  }
}

watch(
  () => query.value,
  async (): Promise<void> => {
    await fetchResults()
  },
  {
    immediate: true
  }
)
</script>

<script lang="ts">
export default {
  name: 'AppCalendarPage',
  layout: 'app'
}
</script>
