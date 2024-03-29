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
    <template #body-currency="{ item }">
      <NuxtLink
        class="ml-1 hover:text-indigo-600 hover:underline"
        :to="`/app/cryptocurrencies/${item.currency.id}`"
      >
        {{ item.currency.symbol }}
      </NuxtLink>
    </template>

    <template #body-hash="{ item }">
      <span class="flex items-center">
        <CommonLink
          :value="item.hash"
          :value-link="getWhaleAlertTransactionHasHref(item)"
          copy
          link
          outer
        />
      </span>
    </template>

    <template #body-amount="{ item }">
      {{ formatCryptocurrency(item.amount, item.currency.symbol) }}
    </template>

    <template #body-amountUsd="{ item }">
      {{ formatCurrency(item.amountUsd, 'USD') }}
    </template>

    <template #body-sender="{ item }">
      <span v-if="item.senderName" class="font-semibold">
        {{ $_.capitalize(item.senderName) }}
      </span>
      <span v-else>
        {{ $t('common.unknown') }}
      </span>
    </template>

    <template #body-senderAddress="{ item }">
      <span v-if="!item.senderAddress">
        {{ $t('common.unknown') }}
      </span>
      <span v-else-if="item.senderAddress === 'multiple'">
        {{ $t('pages.whaleAlerts.table.body.multipleAddresses') }}
      </span>
      <CommonLink v-else :value="item.senderAddress" copy />
    </template>

    <template #body-receiver="{ item }">
      <span v-if="item.receiverName" class="font-semibold">
        {{ $_.capitalize(item.receiverName) }}
      </span>
      <span v-else>
        {{ $t('common.unknown') }}
      </span>
    </template>

    <template #body-receiverAddress="{ item }">
      <span v-if="!item.receiverAddress">
        {{ $t('common.unknown') }}
      </span>
      <span v-else-if="item.receiverAddress === 'multiple'">
        {{ $t('pages.whaleAlerts.table.body.multipleAddresses') }}
      </span>
      <CommonLink v-else :value="item.receiverAddress" copy />
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
import { getWhaleAlertTransactionHasHref } from '~/helpers'

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
      attribute: 'sender',
      label: 'pages.whaleAlerts.table.head.sender'
    },
    {
      key: 'senderAddress',
      attribute: 'senderAddress',
      label: 'pages.whaleAlerts.table.head.senderAddress'
    },
    {
      key: 'receiver',
      attribute: 'receiver',
      label: 'pages.whaleAlerts.table.head.receiver'
    },
    {
      key: 'receiverAddress',
      attribute: 'receiverAddress',
      label: 'pages.whaleAlerts.table.head.receiverAddress'
    },
    {
      key: 'transactionAt',
      attribute: 'transactionAt',
      label: 'pages.whaleAlerts.table.head.transactionAt'
    },
    {
      key: 'notifiedAt',
      attribute: 'notifiedAt',
      label: 'pages.whaleAlerts.table.head.notifiedAt',
      headColClass:
        'whitespace-nowrap py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6',
      bodyColClass:
        'whitespace-nowrap text-right py-4 pl-3 pr-4 text-sm text-gray-500 sm:pr-6'
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
  name: 'WhaleAlertTable'
}
</script>
