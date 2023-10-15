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
    <template #body-pair="{ item }">
      <PairBadge :symbol="item.pair.symbol" />
    </template>

    <template #body-side="{ item }">
      <OrderSideBadge :side="item.side" />
    </template>

    <template #body-baseQuantity="{ item }">
      {{
        formatCryptocurrency(item.baseQuantity, item.pair.baseCurrency.symbol)
      }}
    </template>

    <template #body-quoteQuantity="{ item }">
      {{
        formatCryptocurrency(item.quoteQuantity, item.pair.quoteCurrency.symbol)
      }}
    </template>

    <template #body-price="{ item }">
      {{ getPrice(item) }}
    </template>
  </CommonTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onMounted, useContext } from '@nuxtjs/composition-api'
import { Order, PaginationMeta } from '~/types/http/Entities'
import { TableConfig } from '~/types/common/Table'
import { useLoading } from '~/composables/loading'
import { useFormat } from '~/composables/format'
import { ORDER_SIDE } from '~/enums/order/OrderSide'

const { formatCryptocurrency } = useFormat()
const { isLoading, setIsLoading } = useLoading()
const { $repositories, $toast, i18n } = useContext()

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
      key: 'pair',
      attribute: 'pair.symbol',
      label: 'pages.orders.table.pair'
    },
    {
      key: 'side',
      attribute: 'side',
      label: 'pages.orders.table.side'
    },
    {
      key: 'status',
      attribute: 'status',
      label: 'pages.orders.table.status'
    },
    {
      key: 'baseQuantity',
      attribute: 'baseQuantity',
      label: 'pages.orders.table.baseQuantity'
    },
    {
      key: 'quoteQuantity',
      attribute: 'quoteQuantity',
      label: 'pages.orders.table.quoteQuantity'
    },
    {
      key: 'price',
      attribute: 'price',
      label: 'pages.orders.table.price'
    },
    {
      key: 'createdAt',
      attribute: 'createdAt',
      label: 'common.table.head.createdAt',
      headColClass:
        'whitespace-nowrap py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6',
      bodyColClass:
        'whitespace-nowrap text-right py-4 pl-3 pr-4 text-sm text-gray-500 sm:pr-6'
    }
  ]
})
const data = ref<Order[] | null>(null)
const page = ref<number>(1)
const pagination = ref<PaginationMeta | null>(null)

async function fetchOrders(): Promise<void> {
  setIsLoading(true)

  try {
    const { orders } = await $repositories.order
      .index(page.value)
      .then((response) => response.data.data)

    data.value = orders.data
    pagination.value = orders.meta
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
  await fetchOrders()
}

async function previous(): Promise<void> {
  page.value--
  await fetchOrders()
}

async function paginate(pageNumber: number): Promise<void> {
  page.value = pageNumber
  await fetchOrders()
}

function getPrice(order: Order): string {
  if (order.side === ORDER_SIDE.BUY) {
    return `1 ${order.pair?.baseCurrency?.symbol} / ${formatCryptocurrency(
      order.price,
      order.pair?.quoteCurrency?.symbol as string
    )}`
  } else {
    return `1 ${order.pair?.quoteCurrency?.symbol} / ${formatCryptocurrency(
      order.price,
      order.pair?.baseCurrency?.symbol as string
    )}`
  }
}

onMounted(async (): Promise<void> => {
  await fetchOrders()
})
</script>

<script lang="ts">
export default {
  name: 'OrderTable'
}
</script>
