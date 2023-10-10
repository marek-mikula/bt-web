<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-[480px]">
    <div
      v-if="cryptocurrency === null"
      class="flex items-center justify-center rounded border-2 border-dashed border-indigo-50 p-5 md:rounded-lg"
    >
      <CommonSpinner :type="'primary'" :size="10" />
    </div>

    <div v-else class="overflow-hidden bg-white sm:rounded-lg sm:shadow">
      <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <h3 class="text-base font-semibold leading-6 text-gray-900">
          {{
            $t('pages.cryptocurrency.buy.title', {
              cryptocurrency: cryptocurrency.name
            })
          }}
        </h3>
      </div>

      <div class="px-4 py-4 sm:px-6">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <FormSelect
              v-model="form.data.symbol"
              :name="'symbol'"
              :options="selectValues"
              :label="$t('pages.cryptocurrency.trade.currency').toString()"
              add-empty-option
              required
            />
          </div>

          <div
            v-if="!price && isLoading"
            class="flex items-center justify-center rounded border-2 border-dashed border-indigo-50 p-5 md:rounded-lg"
          >
            <CommonSpinner :type="'primary'" :size="10" />
          </div>

          <div v-if="price && selectedCurrency" class="space-y-6">
            <div>
              <FormInput
                v-model="form.data.quantity"
                :step="0.001"
                :label="$t('pages.cryptocurrency.trade.quantity').toString()"
                :name="'quantity'"
                :type="'number'"
                required
              >
                <template #prepend>
                  <span
                    class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm"
                  >
                    {{ $t('common.buttons.buy').toString().toUpperCase() }}
                  </span>
                </template>

                <template #append>
                  <span
                    class="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm"
                  >
                    {{ cryptocurrency.symbol }}
                  </span>
                </template>
              </FormInput>
            </div>

            <div>
              <FormInput
                v-model="form.data.price"
                :step="0.001"
                :label="$t('pages.cryptocurrency.trade.price').toString()"
                :name="'price'"
                :type="'number'"
              >
                <template #prepend>
                  <span
                    class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm"
                  >
                    {{ $t('common.for').toString().toUpperCase() }}
                  </span>
                </template>

                <template #append>
                  <span
                    class="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm"
                  >
                    {{ selectedCurrency.symbol }}
                  </span>
                </template>
              </FormInput>
            </div>

            <div>
              <CommonButton
                :label="$t('common.buttons.buy').toString()"
                :type="'submit'"
                :color="'success'"
                :size="4"
                :is-loading="isLoading"
                block
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  ref,
  useAsync,
  useContext,
  useRoute,
  watch
} from '@nuxtjs/composition-api'
import { CryptocurrencyTradeResponse } from '~/types/http/Responses'
import { CurrencyWithPivot, CurrencyWithQuotes } from '~/types/http/Entities'
import { FormSelectOption } from '~/types/common/Form'
import { useFormData } from '~/composables/forms/form'
import { CryptocurrencyBuyForm } from '~/types/forms/Cryptocurrency'
import { useLoading } from '~/composables/loading'

const { $repositories, $toast, i18n, $_ } = useContext()
const route = useRoute()
const { createForm } = useFormData()
const { isLoading, setIsLoading } = useLoading()

const form = createForm<CryptocurrencyBuyForm>({
  symbol: null,
  quantity: 0,
  price: 0
})

const interval = ref<number | null>(null)

const price = ref<number | null>(null)
const cryptocurrency = ref<CurrencyWithQuotes | null>(null)
const id = parseInt(route.value.params.id)

const response = useAsync<CryptocurrencyTradeResponse>(async () => {
  return await $repositories.cryptocurrency
    .trade(id)
    .then((response) => response.data)
}, `cryptocurrency-buy-${id}`)

watch(
  () => response.value,
  function (val: CryptocurrencyTradeResponse | null): void {
    cryptocurrency.value = val?.data?.cryptocurrency || null
  },
  {
    immediate: true
  }
)

const selectValues = computed<FormSelectOption[]>(
  () =>
    cryptocurrency.value?.quotes?.map((quote) => {
      return {
        value: quote.pivot.symbol,
        label: quote.symbol
      }
    }) ?? []
)

const selectedCurrency = computed<CurrencyWithPivot | null>(
  () =>
    cryptocurrency.value?.quotes?.find(
      (quote) => quote.pivot.symbol === (form.data.symbol ?? '')
    ) ?? null
)

let changingQuantity = false
let changingPrice = false

watch(
  () => form.data.symbol,
  async (symbol: string | null) => {
    if (!symbol) {
      price.value = null
      stopInterval()
      return
    }

    // load price for selected symbol
    await loadPrice(symbol)

    // start pulling interval
    startInterval()

    // recalculate values
    recalculateValues()
  }
)

watch(
  () => form.data.quantity,
  $_.debounce((val: number | null) => {
    if (changingQuantity) {
      changingQuantity = false
      return
    }

    if (!val || !price.value) {
      form.data.price = 0
      return
    }

    changingPrice = true

    form.data.price = price.value * val
  }, 500)
)

watch(
  () => form.data.price,
  $_.debounce((val: number | null) => {
    if (changingPrice) {
      changingPrice = false
      return
    }

    if (!val || !price.value) {
      form.data.quantity = 0
      return
    }

    changingQuantity = true

    form.data.quantity = val / price.value
  }, 500)
)

function recalculateValues(): void {
  if (form.data.quantity && price.value) {
    changingPrice = true
    form.data.price = price.value * form.data.quantity
    return
  }

  if (form.data.price && price.value) {
    changingQuantity = true
    form.data.quantity = form.data.price / price.value
  }
}

async function loadPrice(symbol: string): Promise<void> {
  setIsLoading(true)

  try {
    const response = await $repositories.cryptocurrency.symbolPrice(symbol)
    price.value = response.data.data.price
  } catch (e: any) {
    $toast.error({
      title: i18n.t('toasts.common.somethingWentWrong').toString()
    })
  } finally {
    setIsLoading(false)
  }
}

async function intervalHandler(): Promise<void> {
  if (!form.data.symbol) {
    return
  }

  await loadPrice(form.data.symbol)

  recalculateValues()
}

function startInterval(): void {
  if (interval.value) {
    return
  }

  interval.value = window.setInterval(intervalHandler, 5 * 1000)
}

function stopInterval(): void {
  if (!interval.value) {
    return
  }

  window.clearInterval(interval.value)
}

onBeforeUnmount((): void => {
  stopInterval()
})
</script>

<script lang="ts">
export default {
  name: 'AppCryptocurrenciesBuyPage',
  layout: 'app'
}
</script>
