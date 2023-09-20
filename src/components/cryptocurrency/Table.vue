<template>
  <div class="px-4 sm:px-0">
    <div class="flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div
            class="overflow-hidden shadow ring-1 ring-gray-200 sm:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    {{ $t('pages.cryptocurrency.list.table.name') }}
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {{ $t('pages.cryptocurrency.list.table.price') }}
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {{ $t('pages.cryptocurrency.list.table.1hChange') }}
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {{ $t('pages.cryptocurrency.list.table.24hChange') }}
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {{ $t('pages.cryptocurrency.list.table.7dChange') }}
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {{ $t('pages.cryptocurrency.list.table.marketCap') }}
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {{ $t('pages.cryptocurrency.list.table.volume24h') }}
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {{
                      $t('pages.cryptocurrency.list.table.circulatingSupply')
                    }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <!-- list of cryptocurrencies -->
                <template v-if="cryptocurrencies?.length > 0">
                  <tr
                    v-for="cryptocurrency in cryptocurrencies"
                    :key="cryptocurrency.id"
                    class="cursor-pointer hover:bg-gray-50"
                    @click="
                      redirect({
                        path: `/app/cryptocurrencies/${cryptocurrency.id}`
                      })
                    "
                  >
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                      <div class="flex items-center">
                        <div class="h-8 w-8 flex-shrink-0">
                          <img
                            class="h-8 w-8 rounded-full"
                            loading="lazy"
                            :src="cryptocurrency.iconUrl"
                            :alt="cryptocurrency.name + ' logo'"
                          />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm">
                            <span class="text-gray-900">
                              {{ cryptocurrency.name }}
                            </span>
                            <span class="ml-1 text-gray-300">
                              {{ cryptocurrency.symbol.toUpperCase() }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{
                        formatCurrency(
                          cryptocurrency.price,
                          cryptocurrency.currency
                        )
                      }}
                    </td>

                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      <CryptocurrencyChangeBadge
                        :value="cryptocurrency.priceChange1h"
                      />
                    </td>

                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      <CryptocurrencyChangeBadge
                        :value="cryptocurrency.priceChange24h"
                      />
                    </td>

                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      <CryptocurrencyChangeBadge
                        :value="cryptocurrency.priceChange7d"
                      />
                    </td>

                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{
                        formatCurrency(
                          cryptocurrency.marketCap,
                          cryptocurrency.currency
                        )
                      }}
                    </td>

                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{
                        formatCurrency(
                          cryptocurrency.volume24h,
                          cryptocurrency.currency
                        )
                      }}
                      <CryptocurrencyChangeBadge
                        class="ml-1"
                        :value="cryptocurrency.volumeChange24h"
                      />
                    </td>

                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{
                        formatCryptocurrency(
                          cryptocurrency.circulatingSupply,
                          cryptocurrency.symbol
                        )
                      }}
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- loading button -->
      <div class="flex items-center justify-center p-4">
        <CommonButton
          :is-loading="isLoading"
          color="primary"
          @click="fetchCryptocurrencies"
        >
          {{ $t('common.buttons.loadMore') }}
        </CommonButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onMounted, useContext } from '@nuxtjs/composition-api'
import { Cryptocurrency } from '~/types/http/Entities'
import { useLoading } from '~/composables/loading'
import { useFormat } from '~/composables/format'
import { useRedirect } from '~/composables/redirect'

const { isLoading, setIsLoading } = useLoading()
const { redirect } = useRedirect()
const { $repositories } = useContext()
const { formatCurrency, formatCryptocurrency } = useFormat()

const page = ref<number>(0)
const end = ref<boolean>(false)
const cryptocurrencies = ref<null | Cryptocurrency[]>(null)

async function fetchCryptocurrencies(): Promise<void> {
  setIsLoading(true)

  try {
    page.value += 1

    const response = await $repositories.cryptocurrency.index(page.value)

    const { data, meta } = response.data.data.cryptocurrencies

    // append current page cryptocurrencies
    // to the cryptocurrencies array if the page
    // is not the first one
    if (page.value === 1) {
      cryptocurrencies.value = data
    } else {
      cryptocurrencies.value = [...(cryptocurrencies.value ?? []), ...data]
    }

    end.value = meta.end
  } catch (e: any) {
    // todo
  } finally {
    setIsLoading(false)
  }
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
