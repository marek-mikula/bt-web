<template>
  <div>
    <div v-if="data">
      <div class="pb-5">
        <div class="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 class="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
            Featured tokens
          </h3>
          <p class="ml-2 mt-1 truncate text-sm text-gray-500">by market cap</p>
        </div>
      </div>

      <div
        class="xxl:grid-cols-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
      >
        <div
          v-for="token in data.data.topCrypto"
          :key="token.id"
          class="relative flex items-center space-x-3 rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
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
              <p class="truncate text-sm text-gray-500">
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
