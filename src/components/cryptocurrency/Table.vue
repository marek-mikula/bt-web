<template>
  <CommonTable
    :data="data"
    :pagination="pagination"
    :config="config"
    :is-loading="isLoading"
    clickable
    @next="next"
    @previous="previous"
    @paginate="paginate"
    @rowClicked="redirectToDetail"
  >
    <template #body-currency="{ item }">
      <div class="flex items-center">
        <div class="h-8 w-8 flex-shrink-0">
          <img
            class="h-8 w-8 rounded-full"
            loading="lazy"
            :src="item.currency.meta.logo"
            :alt="item.currency.name + ' logo'"
          />
        </div>
        <div class="ml-4">
          <div class="text-sm">
            <span class="text-gray-900">
              {{ item.currency.name }}
            </span>
            <span class="ml-1 text-gray-300">
              {{ item.currency.symbol.toUpperCase() }}
            </span>
          </div>
        </div>
      </div>
    </template>

    <template #body-price="{ item }">
      {{ formatCurrency(item.quote.price, item.quote.currency) }}
    </template>

    <template #body-priceChange1h="{ item }">
      <CryptocurrencyChangeBadge :value="item.quote.priceChange1h" />
    </template>

    <template #body-priceChange24h="{ item }">
      <CryptocurrencyChangeBadge :value="item.quote.priceChange24h" />
    </template>

    <template #body-priceChange7d="{ item }">
      <CryptocurrencyChangeBadge :value="item.quote.priceChange7d" />
    </template>

    <template #body-marketCap="{ item }">
      {{ formatCurrency(item.quote.marketCap, item.quote.currency) }}
    </template>

    <template #body-volume24h="{ item }">
      {{ formatCurrency(item.quote.volume24h, item.quote.currency) }}
      <CryptocurrencyChangeBadge
        class="ml-1"
        :value="item.quote.volumeChange24h"
      />
    </template>

    <template #body-maxSupply="{ item }">
      {{
        item.quote.infiniteSupply
          ? '&infin;'
          : item.quote.maxSupply > 0
          ? formatNumber(item.quote.maxSupply)
          : '-'
      }}
    </template>

    <template #body-circulatingSupply="{ item }">
      {{
        formatCryptocurrency(item.quote.circulatingSupply, item.currency.symbol)
      }}
    </template>
  </CommonTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onMounted, useContext } from '@nuxtjs/composition-api'
import { CryptocurrencyList, PaginationMeta } from '~/types/http/Entities'
import { useLoading } from '~/composables/loading'
import { useFormat } from '~/composables/format'
import { TableConfig } from '~/types/common/Table'
import { useRedirect } from '~/composables/redirect'

const { redirect } = useRedirect()
const { isLoading, setIsLoading } = useLoading()
const { $repositories, $toast, i18n } = useContext()
const { formatCurrency, formatCryptocurrency, formatNumber } = useFormat()

const config = ref<TableConfig>({
  unique: 'currency.cmcId',
  emptyLabel: 'common.table.noData',
  columns: [
    {
      key: 'currency',
      attribute: 'currency',
      label: 'pages.cryptocurrency.list.table.name',
      headColClass:
        'whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6',
      bodyColClass:
        'whitespace-nowrap text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'
    },
    {
      key: 'price',
      attribute: 'quote.price',
      label: 'pages.cryptocurrency.list.table.price'
    },
    {
      key: 'priceChange1h',
      attribute: 'quote.priceChange1h',
      label: 'pages.cryptocurrency.list.table.1hChange'
    },
    {
      key: 'priceChange24h',
      attribute: 'quote.priceChange24h',
      label: 'pages.cryptocurrency.list.table.24hChange'
    },
    {
      key: 'priceChange7d',
      attribute: 'quote.priceChange7d',
      label: 'pages.cryptocurrency.list.table.7dChange'
    },
    {
      key: 'marketCap',
      attribute: 'quote.marketCap',
      label: 'pages.cryptocurrency.list.table.marketCap'
    },
    {
      key: 'volume24h',
      attribute: 'quote.volume24h',
      label: 'pages.cryptocurrency.list.table.volume24h'
    },
    {
      key: 'maxSupply',
      attribute: 'quote.maxSupply',
      label: 'pages.cryptocurrency.list.table.maxSupply'
    },
    {
      key: 'circulatingSupply',
      attribute: 'quote.circulatingSupply',
      label: 'pages.cryptocurrency.list.table.circulatingSupply',
      headColClass:
        'whitespace-nowrap py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6',
      bodyColClass:
        'whitespace-nowrap text-right py-4 pl-3 pr-4 text-sm text-gray-500 sm:pr-6'
    }
  ]
})
const data = ref<CryptocurrencyList[] | null>(null)
const page = ref<number>(1)
const pagination = ref<PaginationMeta | null>(null)

async function fetchCryptocurrencies(): Promise<void> {
  setIsLoading(true)

  try {
    const { cryptocurrencies } = await $repositories.cryptocurrency
      .index(page.value)
      .then((response) => response.data.data)

    data.value = cryptocurrencies.data
    pagination.value = cryptocurrencies.meta
  } catch (e: any) {
    $toast.error({
      title: i18n.t('toasts.common.somethingWentWrong').toString()
    })
  } finally {
    setIsLoading(false)
  }
}

async function next(): Promise<void> {
  page.value++
  await fetchCryptocurrencies()
}

async function previous(): Promise<void> {
  page.value--
  await fetchCryptocurrencies()
}

async function paginate(pageNumber: number): Promise<void> {
  page.value = pageNumber
  await fetchCryptocurrencies()
}

async function redirectToDetail(item: CryptocurrencyList): Promise<void> {
  await redirect({ path: `/app/cryptocurrencies/${item.currency.id}` })
}

onMounted(async (): Promise<void> => {
  await fetchCryptocurrencies()
})
</script>

<script lang="ts">
export default {
  name: 'CryptocurrencyTable'
}
</script>
