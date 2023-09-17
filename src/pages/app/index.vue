<template>
  <div>
    <CommonAlertOnce
      class="mb-5"
      :identifier="'dashboard-cold-wallets'"
      :type="'info'"
      :label="$t('pages.dashboard.coldWalletAlert.title').toString()"
      :actions="[
        {
          label: {
            key: 'pages.dashboard.coldWalletAlert.action'
          },
          handler: redirectToTrezor
        }
      ]"
    >
      <span
        v-html="$t('pages.dashboard.coldWalletAlert.message').toString()"
      ></span>
    </CommonAlertOnce>

    <div class="pb-5 sm:flex sm:items-center sm:justify-between">
      <div class="flex items-center">
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
            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
          />
        </svg>
        <div class="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 class="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
            {{ $t('pages.dashboard.marketData.title') }}
          </h3>
        </div>
      </div>
    </div>

    <dl
      v-if="marketMetrics"
      class="mb-7 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded border border-gray-200 bg-white shadow-sm md:grid-cols-3 md:divide-x md:divide-y-0 md:rounded-lg"
    >
      <!-- total market cap block -->
      <div class="px-4 py-5 sm:p-6">
        <dt class="text-base text-sm font-medium text-gray-900">
          {{ $t('pages.dashboard.marketData.sections.totalMarketCap') }}
        </dt>
        <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
          <div class="flex items-baseline text-sm text-gray-500">
            {{
              formatCurrency(
                marketMetrics.totalMarketCap,
                marketMetrics.totalMarketCapCurrency
              )
            }}
          </div>
          <CryptocurrencyChangeBadge
            :value="marketMetrics.totalMarketCapPercentageChange"
          />
        </dd>
      </div>

      <!-- bitcoin dominance block -->
      <div class="px-4 py-5 sm:p-6">
        <dt class="text-base text-sm font-medium text-gray-900">
          {{ $t('pages.dashboard.marketData.sections.btcDominance') }}
        </dt>
        <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
          <div class="flex items-baseline text-sm text-gray-500">
            {{ formatPercent(marketMetrics.btcDominance) }}
          </div>
          <CryptocurrencyChangeBadge
            :value="marketMetrics.btcDominancePercentageChange"
          />
        </dd>
      </div>

      <!-- ethereum dominance block -->
      <div class="px-4 py-5 sm:p-6">
        <dt class="text-base text-sm font-medium text-gray-900">
          {{ $t('pages.dashboard.marketData.sections.ethDominance') }}
        </dt>
        <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
          <div class="flex items-baseline text-sm text-gray-500">
            {{ formatPercent(marketMetrics.ethDominance) }}
          </div>
          <CryptocurrencyChangeBadge
            :value="marketMetrics.ethDominancePercentageChange"
          />
        </dd>
      </div>
    </dl>

    <!-- skeleton loader -->
    <dl
      v-else
      class="mb-7 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0 md:rounded-lg"
    >
      <div
        v-for="n in 3"
        :key="n"
        class="h-24 animate-pulse bg-gray-100 px-4 py-5 sm:p-6"
      ></div>
    </dl>

    <div class="pb-5 sm:flex sm:items-center sm:justify-between">
      <div class="flex items-center">
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
            d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
          />
        </svg>

        <div class="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 class="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
            {{ $t('pages.dashboard.featuredTokens.title') }}
          </h3>
          <p class="ml-2 mt-1 truncate text-sm text-gray-500">
            {{ $t('pages.dashboard.featuredTokens.subtitle') }}
          </p>
        </div>
      </div>
      <div class="mt-3 sm:ml-4 sm:mt-0">
        <NuxtLink
          to="/app/cryptocurrencies"
          class="flex items-center text-sm font-semibold hover:text-indigo-600"
        >
          <span class="mr-0.5">
            {{ $t('common.buttons.showAll') }}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </NuxtLink>
      </div>
    </div>

    <div
      v-if="featuredTokens"
      class="xxl:grid-cols-4 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3"
    >
      <div
        v-for="token in featuredTokens"
        :key="token.id"
        class="relative flex items-center space-x-3 rounded border border-gray-200 bg-white px-3 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 md:rounded-lg md:px-6 md:py-5"
      >
        <div class="flex-shrink-0">
          <img
            class="h-10 w-10 rounded-full"
            :src="token.iconUrl"
            alt="Cryptocurrency icon"
          />
        </div>
        <div class="min-w-0 flex-1">
          <a
            href="#"
            class="focus:outline-none"
            @click.prevent="
              redirect({ path: `/app/cryptocurrencies/${token.id}` })
            "
          >
            <span class="absolute inset-0" aria-hidden="true"></span>
            <p class="text-sm">
              <span class="font-medium text-gray-900">
                {{ token.name }}
              </span>
              <span class="ml-1 text-gray-300">
                {{ token.symbol.toUpperCase() }}
              </span>
            </p>
            <p class="truncate text-xs text-gray-500 md:text-sm">
              {{ formatCurrency(token.quotePrice, token.quoteCurrency) }}
            </p>
          </a>
        </div>
      </div>
    </div>

    <!-- skeleton loader -->
    <div v-else class="xxl:grid-cols-4 grid grid-cols-2 gap-4 md:grid-cols-3">
      <div
        v-for="n in 5"
        :key="n"
        class="h-20 animate-pulse rounded border border-gray-200 bg-white bg-gray-200 px-3 py-2.5 shadow-sm md:rounded-lg md:px-6 md:py-5"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useAsync, useContext, watch } from '@nuxtjs/composition-api'
import { DashboardIndexResponse } from '~/types/http/Responses'
import { DashboardMarketMetrics, DashboardToken } from '~/types/http/Entities'
import { useFormat } from '~/composables/format'
import { useRedirect } from '~/composables/redirect'

const { $repositories } = useContext()
const { redirect } = useRedirect()
const { formatCurrency, formatPercent } = useFormat()

const marketMetrics = ref<null | DashboardMarketMetrics>(null)
const featuredTokens = ref<null | DashboardToken[]>(null)

const data = useAsync<DashboardIndexResponse>(async () => {
  return await $repositories.dashboard.index().then((response) => response.data)
}, 'dashboard')

watch(
  () => data.value,
  function (val: DashboardIndexResponse | null): void {
    marketMetrics.value = val?.data?.marketMetrics || null
    featuredTokens.value = val?.data?.topCrypto || null
  },
  {
    immediate: true
  }
)

function redirectToTrezor(): void {
  window.open('https://trezor.io/', '_blank')
}
</script>

<script lang="ts">
export default {
  name: 'AppHomePage',
  layout: 'app'
}
</script>
