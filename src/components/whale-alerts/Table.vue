<template>
  <CommonTable
    :data="data"
    :is-loading="isLoading"
    :pagination="pagination"
    :config="config"
    @next="next"
    @previous="previous"
    @paginate="paginate"
  >
    <template #bodyCurrency="{ item }">
      <NuxtLink
        class="ml-1 hover:text-indigo-600 hover:underline"
        :to="`/app/cryptocurrencies/${item.currency.id}`"
      >
        {{ item.currency.symbol }}
      </NuxtLink>
    </template>

    <template #bodyHash="{ item }">
      <span class="flex items-center">
        <CommonClipboard :value="item.hash">
          {{ $_.truncate(item.hash) }}
        </CommonClipboard>
        <a
          :href="getHashHref(item)"
          target="_blank"
          class="ml-1 hover:text-indigo-600"
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </a>
      </span>
    </template>

    <template #bodyAmount="{ item }">
      {{ formatCryptocurrency(item.amount, item.currency.symbol) }}
    </template>

    <template #bodyAmountUsd="{ item }">
      {{ formatCurrency(item.amountUsd, 'USD') }}
    </template>

    <template #bodySender="{ item }">
      <span v-if="item.senderName && item.senderAddress">
        <span class="font-semibold">
          {{ $_.capitalize(item.senderName) }}
        </span>
        <span>-</span>
        <span v-if="item.senderAddress === 'multiple'">
          {{ $t('pages.whaleAlerts.table.body.multipleAddresses') }}
        </span>
        <CommonClipboard v-else :value="item.senderAddress">
          {{ $_.truncate(item.senderAddress) }}
        </CommonClipboard>
      </span>

      <span v-else-if="item.senderName" class="font-semibold">
        {{ $_.capitalize(item.senderName) }}
      </span>

      <span v-else-if="item.senderAddress">
        <span v-if="item.senderAddress === 'multiple'">
          {{ $t('pages.whaleAlerts.table.body.multipleAddresses') }}
        </span>
        <CommonClipboard v-else :value="item.senderAddress">
          {{ $_.truncate(item.senderAddress) }}
        </CommonClipboard>
      </span>

      <span v-else>
        {{ $t('pages.whaleAlerts.table.body.unknownSender') }}
      </span>
    </template>

    <template #bodyReceiver="{ item }">
      <span v-if="item.receiverName && item.receiverAddress">
        <span class="font-semibold">
          {{ $_.capitalize(item.receiverName) }}
        </span>
        <span>-</span>
        <span v-if="item.receiverAddress === 'multiple'">
          {{ $t('pages.whaleAlerts.table.body.multipleAddresses') }}
        </span>
        <CommonClipboard v-else :value="item.receiverAddress">
          {{ $_.truncate(item.receiverAddress) }}
        </CommonClipboard>
      </span>

      <span v-else-if="item.receiverName" class="font-semibold">
        {{ $_.capitalize(item.receiverName) }}
      </span>

      <span v-else-if="item.receiverAddress">
        <span v-if="item.receiverAddress === 'multiple'">
          {{ $t('pages.whaleAlerts.table.body.multipleAddresses') }}
        </span>
        <CommonClipboard v-else :value="item.receiverAddress">
          {{ $_.truncate(item.receiverAddress) }}
        </CommonClipboard>
      </span>

      <span v-else>
        {{ $t('pages.whaleAlerts.table.body.unknownReceiver') }}
      </span>
    </template>
  </CommonTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onMounted, useContext } from '@nuxtjs/composition-api'
import { PaginationMeta, WhaleAlert } from '~/types/http/Entities'
import { TableConfig } from '~/types/common/Table'
import { useLoading } from '~/composables/loading'
import { useFormat } from '~/composables/format'
import { CURRENCY_SYMBOL } from '~/enums/common/Currency'

const { isLoading, setIsLoading } = useLoading()
const { $repositories, $toast, i18n } = useContext()
const { formatCurrency, formatCryptocurrency } = useFormat()

const config = ref<TableConfig>({
  unique: 'id',
  emptyLabel: 'common.table.noData',
  columns: [
    {
      key: 'id',
      attribute: 'id',
      label: 'common.table.head.id',
      headColClass:
        'whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6',
      bodyColClass:
        'whitespace-nowrap text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'
    },
    {
      key: 'currency',
      attribute: 'currency',
      label: 'pages.whaleAlerts.table.head.currency'
    },
    {
      key: 'hash',
      attribute: 'hash',
      label: 'pages.whaleAlerts.table.head.hash'
    },
    {
      key: 'amount',
      attribute: 'amount',
      label: 'pages.whaleAlerts.table.head.amount'
    },
    {
      key: 'amountUsd',
      attribute: 'amountUsd',
      label: 'pages.whaleAlerts.table.head.amountUsd'
    },
    {
      key: 'sender',
      attribute: 'senderAddress',
      label: 'pages.whaleAlerts.table.head.sender'
    },
    {
      key: 'receiver',
      attribute: 'receiverAddress',
      label: 'pages.whaleAlerts.table.head.receiver'
    },
    {
      key: 'notifiedAt',
      attribute: 'notifiedAt',
      label: 'pages.whaleAlerts.table.head.notifiedAt',
      headColClass:
        'whitespace-nowrap py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6',
      bodyColClass:
        'whitespace-nowrap text-right py-4 pl-3 pr-4 text-sm font-medium text-gray-900 sm:pr-6'
    }
  ]
})
const data = ref<WhaleAlert[] | null>(null)
const page = ref<number>(1)
const pagination = ref<PaginationMeta | null>(null)

async function fetchWhaleAlerts(): Promise<void> {
  setIsLoading(true)

  try {
    const { whaleAlerts } = await $repositories.whaleAlert
      .index(page.value)
      .then((response) => response.data.data)

    data.value = whaleAlerts.data
    pagination.value = whaleAlerts.meta
  } catch (e: any) {
    $toast.error({
      title: i18n.t('toasts.common.somethingWentWrong').toString()
    })
  } finally {
    setIsLoading(false)
  }
}

function getHashHref(item: WhaleAlert): string {
  switch (item.currency.symbol) {
    case CURRENCY_SYMBOL.BNB:
      return `https://bscscan.com/tx/${item.hash}`
    case CURRENCY_SYMBOL.BTC:
      return `https://www.blockchain.com/explorer/transactions/btc/${item.hash}`
    case CURRENCY_SYMBOL.ETH:
      return `https://www.blockchain.com/explorer/transactions/eth/${item.hash}`
    case CURRENCY_SYMBOL.XRP:
      return `https://blockchair.com/ripple/transaction/${item.hash}`
  }
}

async function next(): Promise<void> {
  page.value++
  await fetchWhaleAlerts()
}

async function previous(): Promise<void> {
  page.value--
  await fetchWhaleAlerts()
}

async function paginate(pageNumber: number): Promise<void> {
  page.value = pageNumber
  await fetchWhaleAlerts()
}

onMounted(async () => {
  await fetchWhaleAlerts()
})
</script>

<script lang="ts">
export default {
  name: 'WhaleAlertsTable'
}
</script>
