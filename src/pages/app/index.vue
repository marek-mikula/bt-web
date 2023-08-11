<template>
  <div>
    <div v-if="data">
      <div
        class="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between"
      >
        <div class="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 class="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
            {{ $t('pages.dashboard.featuredTokens.title') }}
          </h3>
          <p class="ml-2 mt-1 truncate text-sm text-gray-500">
            {{ $t('pages.dashboard.featuredTokens.subtitle') }}
          </p>
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

      <div class="xxl:grid-cols-4 grid grid-cols-2 gap-4 md:grid-cols-3">
        <div
          v-for="token in data.data.topCrypto"
          :key="token.id"
          class="relative flex items-center space-x-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 md:px-6 md:py-5"
        >
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              :src="token.iconUrl"
              alt="Cryptocurrency icon"
            />
          </div>
          <div class="min-w-0 flex-1">
            <a href="#" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true"></span>
              <p class="text-sm font-medium text-gray-900">{{ token.name }}</p>
              <p class="truncate text-xs text-gray-500 md:text-sm">
                {{ token.quotePrice.toFixed(5) }} {{ token.quoteCurrency }}
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAsync, useContext } from '@nuxtjs/composition-api'
import { DashboardIndexResponse } from '~/types/http/Responses'

const { $repositories } = useContext()

const data = useAsync<DashboardIndexResponse>(async () => {
  return await $repositories.dashboard.index().then((response) => response.data)
}, 'dashboard')
</script>

<script lang="ts">
export default {
  name: 'AppHome',
  layout: 'app'
}
</script>
