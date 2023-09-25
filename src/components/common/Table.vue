<template>
  <div class="flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div
          class="relative overflow-hidden shadow ring-1 ring-gray-200 sm:rounded-lg"
        >
          <!-- loading spinner -->
          <div
            v-if="isLoading"
            class="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75"
          >
            <CommonSpinner :size="8" />
          </div>

          <table class="min-w-full divide-y divide-gray-200">
            <!-- table head -->
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="column in config.columns"
                  :key="`head-${column.key}`"
                  scope="col"
                  :class="
                    column.headColClass ??
                    'whitespace-nowrap px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  "
                >
                  <slot :name="`head-${column.key}`" :column="column">
                    {{ trans(column.label) }}
                  </slot>
                </th>
              </tr>
            </thead>

            <!-- table body -->
            <tbody class="divide-y divide-gray-200 bg-white">
              <!-- table body - data -->
              <template v-if="data !== null && data.length > 0">
                <tr
                  v-for="item in data"
                  :key="`row-${$_.get(item, config.unique)}`"
                  :class="{
                    'cursor-pointer hover:bg-gray-50': clickable
                  }"
                  @click="handleRowClick(item)"
                >
                  <td
                    v-for="column in config.columns"
                    :key="`body-${$_.get(item, config.unique)}-${column.key}`"
                    :class="
                      column.bodyColClass ??
                      'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                    "
                  >
                    <slot
                      :name="`body-${column.key}`"
                      :column="column"
                      :item="item"
                    >
                      {{ $_.get(item, column.attribute) ?? '-' }}
                    </slot>
                  </td>
                </tr>
              </template>

              <!-- table body - empty row -->
              <template v-else-if="data !== null && data.length < 1">
                <tr>
                  <td
                    class="py-3.5 px-4 text-left text-sm text-gray-500 sm:px-6"
                    :colspan="config.columns.length"
                  >
                    {{ trans(config.emptyLabel) }}
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div
      v-if="pagination"
      class="mt-3 flex items-center justify-between rounded bg-white px-4 py-3 ring-1 ring-gray-200 sm:px-6 md:rounded-lg"
    >
      <div class="flex flex-1 justify-between sm:hidden">
        <button
          type="button"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
          :disabled="!isPreviousButtonEnabled"
          @click.prevent="previous"
        >
          {{ $t('common.table.buttons.previous') }}
        </button>
        <button
          type="button"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
          :disabled="!isNextButtonEnabled"
          @click.prevent="next"
        >
          {{ $t('common.table.buttons.next') }}
        </button>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <i18n
            path="common.table.results"
            tag="p"
            class="text-sm text-gray-700"
          >
            <template #from>
              <span class="font-semibold">
                {{ pagination.from }}
              </span>
            </template>
            <template #to>
              <span class="font-semibold">
                {{ pagination.to }}
              </span>
            </template>
            <template #total>
              <span class="font-semibold">
                {{ pagination.total }}
              </span>
            </template>
          </i18n>
        </div>
        <div>
          <nav
            class="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <!-- previous button -->
            <button
              type="button"
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
              :disabled="!isPreviousButtonEnabled"
              @click.prevent="previous"
            >
              <span class="sr-only">
                {{ $t('common.table.buttons.previous') }}
              </span>
              <svg
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <button
              v-for="page in pages"
              :key="page"
              type="button"
              :aria-current="page === pagination.currentPage ? 'page' : null"
              :disabled="page === pagination.currentPage"
              :class="{
                'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600':
                  page === pagination.currentPage,
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
                  page !== pagination.currentPage
              }"
              @click.prevent="paginate(page)"
            >
              {{ page }}
            </button>

            <!-- next button -->
            <button
              type="button"
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
              :disabled="!isNextButtonEnabled"
              @click.prevent="next"
            >
              <span class="sr-only">
                {{ $t('common.table.buttons.next') }}
              </span>
              <svg
                class="h-5 w-5"
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
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from '@nuxtjs/composition-api'
import { TableConfig } from '~/types/common/Table'
import { useTranslation } from '~/composables/translation'
import { PaginationMeta } from '~/types/http/Entities'

const { trans } = useTranslation()

const props = withDefaults(
  defineProps<{
    config: TableConfig
    data: object[] | null
    pagination?: PaginationMeta | null
    isLoading?: boolean
    clickable?: boolean
  }>(),
  {
    pagination: null,
    isLoading: false,
    clickable: false
  }
)

const margin = ref<number>(2)

const pages = computed<number[]>(() => {
  if (!props.pagination) {
    return []
  }

  const { currentPage, lastPage } = props.pagination

  let from = currentPage - margin.value
  let to = currentPage + margin.value

  if (from < 1) {
    from = 1
  }

  if (to > lastPage) {
    to = lastPage
  }

  const pages = []

  if (from > 1) {
    pages.push(1)
  }

  for (let x = from; x <= to; x++) {
    if (!pages.includes(x)) {
      pages.push(x)
    }
  }

  if (to < lastPage) {
    pages.push(lastPage)
  }

  return pages
})

const emit = defineEmits<{
  (e: 'next'): void
  (e: 'previous'): void
  (e: 'paginate', pageNumber: number): void
  (e: 'rowClicked', item: any): void
}>()

const isNextButtonEnabled = computed(
  () =>
    props.pagination && props.pagination.currentPage < props.pagination.lastPage
)
const isPreviousButtonEnabled = computed(
  () => props.pagination && props.pagination.currentPage > 1
)

function next(): void {
  if (
    !props.pagination ||
    props.pagination.currentPage >= props.pagination.lastPage
  ) {
    return
  }

  emit('next')
}

function previous(): void {
  if (!props.pagination || props.pagination.currentPage <= 1) {
    return
  }

  emit('previous')
}

function paginate(pageNumber: number): void {
  if (
    !props.pagination ||
    pageNumber < 1 ||
    pageNumber > props.pagination.lastPage
  ) {
    return
  }

  emit('paginate', pageNumber)
}

function handleRowClick(item: any): void {
  if (!props.clickable) {
    return
  }

  emit('rowClicked', item)
}
</script>

<script lang="ts">
export default {
  name: 'CommonTable'
}
</script>
