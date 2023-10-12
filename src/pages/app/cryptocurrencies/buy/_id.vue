<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-[480px]">
    <div
      v-if="cryptocurrency === null"
      class="flex items-center justify-center rounded border-2 border-dashed border-indigo-50 p-5 md:rounded-lg"
    >
      <CommonSpinner :type="'primary'" :size="10" />
    </div>

    <div v-else class="overflow-hidden bg-white sm:rounded-lg sm:shadow">
      <div
        class="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-5 sm:px-6"
      >
        <h3 class="text-base font-semibold leading-6 text-gray-900">
          {{
            $t('pages.cryptocurrency.buy.title', {
              cryptocurrency: cryptocurrency.name
            })
          }}
        </h3>

        <NuxtLink
          :to="`/app/cryptocurrencies/${cryptocurrency?.id}`"
          class="flex inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          {{ $t('common.buttons.back') }}
        </NuxtLink>
      </div>

      <div class="px-4 py-4 sm:px-6">
        <form class="space-y-6" action="#" method="POST" @submit.prevent="buy">
          <CommonAlertForm :errors="fetchErrors('common')" />

          <div>
            <FormCheckbox
              :id="'ignore-limits-validation'"
              v-model="form.data.ignoreLimitsValidation"
              :name="'ignoreLimitsValidation'"
              :label="
                $t(
                  'pages.cryptocurrency.trade.ignoreLimitsValidation'
                ).toString()
              "
            />
          </div>

          <div>
            <FormSelect
              v-model="form.data.symbol"
              :name="'symbol'"
              :options="selectValues"
              :label="$t('pages.cryptocurrency.trade.currency').toString()"
              :error="fieldError('symbol')"
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
                :label="$t('pages.cryptocurrency.trade.quantity').toString()"
                :name="'quantity'"
                :type="'number'"
                :error="fieldError('quantity')"
                :max="selectedCurrency?.pivot?.maxQuantity"
                :min="selectedCurrency?.pivot?.minQuantity"
                :step="selectedCurrency?.pivot?.stepSize"
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
                v-model="pricePreview"
                :label="$t('pages.cryptocurrency.trade.price').toString()"
                :name="'price'"
                :type="'number'"
                :error="fieldError('price')"
                readonly
                required
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
import { AxiosResponse } from 'axios'
import {
  CryptocurrencyTradeResponse,
  InvalidContentResponse,
  JsonResponse
} from '~/types/http/Responses'
import { CurrencyWithPivot, CurrencyWithQuotes } from '~/types/http/Entities'
import { FormSelectOption } from '~/types/common/Form'
import { useForm, useFormData } from '~/composables/forms/form'
import { useLoading } from '~/composables/loading'
import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import { OrderForm } from '~/types/forms/Order'
import { useRedirect } from '~/composables/redirect'

const { $repositories, $toast, i18n, $_ } = useContext()
const route = useRoute()
const { createForm } = useFormData()
const { isLoading, setIsLoading } = useLoading()
const { fieldError, parseErrors, clearErrors, fetchErrors } = useForm()
const { redirect } = useRedirect()

const form = createForm<OrderForm>({
  symbol: null,
  quantity: 0,
  ignoreLimitsValidation: false
})

const interval = ref<number | null>(null)

const pricePreview = ref<number>(0)
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

function recalculateValues(): void {
  pricePreview.value = (price.value ?? 0) * (form.data.quantity ?? 0)
}

watch(() => form.data.quantity, $_.debounce(recalculateValues, 500))

async function loadPrice(symbol: string): Promise<void> {
  setIsLoading(true)

  try {
    price.value = await $repositories.cryptocurrency
      .symbolPrice(symbol)
      .then((response) => response.data.data.price)
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

async function buy(): Promise<void> {
  setIsLoading(true)

  try {
    await $repositories.order.buy(form.data)

    clearErrors()

    $toast.success({
      title: i18n.t('toasts.order.buy.success').toString()
    })

    await redirect({
      path: `/app/cryptocurrencies/${cryptocurrency.value?.id}`
    })
  } catch (e: any) {
    const response: AxiosResponse<JsonResponse> = e.response

    if (response.data.code === RESPONSE_CODE.INVALID_CONTENT) {
      parseErrors(response.data as InvalidContentResponse)

      $toast.error({
        title: i18n.t('toasts.common.formErrors').toString()
      })

      return
    }

    clearErrors()

    $toast.error({
      title: i18n.t('toasts.common.somethingWentWrong').toString()
    })
  } finally {
    setIsLoading(false)
  }
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
