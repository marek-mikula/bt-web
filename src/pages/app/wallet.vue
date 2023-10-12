<template>
  <div class="space-y-5">
    <!-- page header -->
    <div class="md:flex md:items-center md:justify-between">
      <div class="min-w-0 flex-1">
        <h2
          class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
        >
          {{ $t('pages.wallet.title') }}
        </h2>
      </div>
      <div class="mt-4 flex md:ml-4 md:mt-0">
        <span class="text-sm text-gray-300">
          {{ $t('pages.wallet.lastSyncAt', { datetime: user.assetsSyncedAt }) }}
        </span>
      </div>
    </div>

    <CommonAlertOnce
      :identifier="'wallet-unsupported-assets'"
      :type="'info'"
      :message="$t('pages.wallet.unsupportedAssetsAlert').toString()"
    />

    <div
      class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
    >
      <FormInput
        v-model="search"
        :label="'Search currency'"
        :type="'search'"
        :name="'search'"
      />
    </div>

    <div>
      <!-- loading spinner -->
      <div
        v-if="visibleAssets === null"
        class="flex items-center justify-center rounded border-2 border-dashed border-indigo-50 p-5 md:rounded-lg"
      >
        <CommonSpinner :type="'primary'" :size="10" />
      </div>

      <ul
        v-else
        role="list"
        class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
      >
        <li
          v-for="asset in visibleAssets"
          :key="asset.id"
          :class="[
            'relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white',
            {
              'group hover:border-indigo-200':
                asset.isSupported && asset.currency && !asset.currency.isFiat
            }
          ]"
        >
          <NuxtLink
            v-if="asset.isSupported && asset.currency && !asset.currency.isFiat"
            :to="`/app/cryptocurrencies/${asset?.currency?.id}`"
          >
            <span class="absolute inset-0"></span>
          </NuxtLink>

          <div
            class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6"
          >
            <img
              v-if="asset.currency && !asset.currency.isFiat"
              :src="asset.currency?.meta?.logo"
              alt="Tuple"
              class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
            />
            <div
              v-else
              class="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-white ring-1 ring-gray-900/10"
            >
              <span class="font-bold text-indigo-600">
                {{
                  asset.currency
                    ? asset.currency?.symbol?.charAt(0)?.toUpperCase()
                    : asset.currencySymbol?.charAt(0)?.toUpperCase()
                }}
              </span>
            </div>

            <div class="flex items-center text-sm font-medium leading-6">
              <template v-if="asset.currency && !asset.currency.isFiat">
                <span class="text-gray-900 group-hover:text-indigo-500">
                  {{ asset.currency.name }}
                </span>
                <span class="ml-1 text-gray-300">
                  {{ asset.currency?.symbol?.toUpperCase() }}
                </span>
              </template>

              <template v-else-if="asset.currency && asset.currency.isFiat">
                <span class="text-gray-900">
                  {{ asset.currency?.symbol?.toUpperCase() }}
                </span>
              </template>

              <template v-else>
                <span class="text-gray-900">
                  {{ asset.currencySymbol }}
                </span>
              </template>
            </div>
          </div>

          <dl
            class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6"
          >
            <div class="flex justify-between gap-x-4 py-3">
              <dt class="text-gray-500">
                {{ $t('pages.wallet.asset.balance') }}
              </dt>
              <dd
                v-if="asset.currency?.isFiat"
                class="font-medium text-gray-900"
              >
                {{ formatCurrency(asset.balance, asset.currency?.symbol) }}
              </dd>
              <dd v-else class="font-medium text-gray-900">
                {{
                  formatCryptocurrency(
                    asset.balance,
                    asset.currency?.symbol ?? asset.currencySymbol
                  )
                }}
              </dd>
            </div>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  useAsync,
  useContext,
  watch
} from '@nuxtjs/composition-api'
import { AssetIndexResponse } from '~/types/http/Responses'
import { Asset } from '~/types/http/Entities'
import { useFormat } from '~/composables/format'
import { useUser } from '~/composables/user'

const { $repositories } = useContext()
const { formatCryptocurrency, formatCurrency } = useFormat()
const { getUser } = useUser()

const user = getUser()
const search = ref<string | null>(null)
const assets = ref<Asset[] | null>(null)

const visibleAssets = computed<Asset[] | null>(() => {
  if (!assets.value) {
    return null
  }

  if (!search.value) {
    return assets.value
  }

  return assets.value.filter((asset) => {
    if (asset.currencySymbol) {
      return asset.currencySymbol
        .toLowerCase()
        .includes((search.value as string).toLowerCase())
    }

    if (asset.currency) {
      return (
        asset.currency.symbol
          .toLowerCase()
          .includes((search.value as string).toLowerCase()) ||
        asset.currency.name
          .toLowerCase()
          .includes((search.value as string).toLowerCase())
      )
    }

    return true
  })
})

const response = useAsync<AssetIndexResponse>(async () => {
  return await $repositories.userAsset.index().then((response) => response.data)
}, 'assets')

watch(
  () => response.value,
  (response: AssetIndexResponse | null): void => {
    if (!response) {
      assets.value = null
      return
    }

    assets.value = response.data.assets
  },
  {
    immediate: true
  }
)
</script>

<script lang="ts">
export default {
  name: 'AppWalletPage',
  layout: 'app'
}
</script>
