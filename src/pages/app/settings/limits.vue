<template>
  <div class="space-y-4">
    <CommonAlert
      :type="'info'"
      :message="'Limits can be updated only once in 3 days for security reasons. Please be cautious while updating them.'"
    />

    <div class="overflow-hidden rounded bg-white shadow md:rounded-lg">
      <div class="bg-white px-4 py-5 sm:px-6">
        <h3 class="mb-2 text-base font-semibold leading-6 text-gray-900">
          <FormCheckbox
            :id="'trade-enabled'"
            v-model="form.data.trade.enabled"
            :name="'trade[enabled]'"
            :label="'Number of trades'"
          />
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Maintain a balanced trading strategy by staying within the suggested
          trade limits for daily, weekly, and monthly periods.
        </p>
      </div>
      <div
        v-if="form.data.trade.enabled"
        class="border-t border-gray-200 px-4 py-5 sm:px-6"
      >
        <div class="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-6">
          <FormInput
            :id="'trade-daily'"
            v-model="form.data.trade.daily"
            :name="'trade[daily]'"
            :type="'number'"
            :min="0"
            :label="'Number of daily trades'"
            :error="fieldError('trade.daily')"
            class="md:col-span-2"
          />

          <FormInput
            :id="'trade-weekly'"
            v-model="form.data.trade.weekly"
            :name="'trade[weekly]'"
            :type="'number'"
            :min="0"
            :label="'Number of weekly trades'"
            :error="fieldError('trade.weekly')"
            class="md:col-span-2"
          />

          <FormInput
            :id="'trade-monthly'"
            v-model="form.data.trade.monthly"
            :name="'trade[monthly]'"
            :type="'number'"
            :min="0"
            :label="'Number of monthly trades'"
            :error="fieldError('trade.monthly')"
            class="md:col-span-2"
          />
        </div>
      </div>
    </div>

    <div class="overflow-hidden rounded bg-white shadow md:rounded-lg">
      <div class="bg-white px-4 py-5 sm:px-6">
        <h3 class="mb-2 text-base font-semibold leading-6 text-gray-900">
          <FormCheckbox
            :id="'cryptocurrency-enabled'"
            v-model="form.data.cryptocurrency.enabled"
            :name="'cryptocurrency[enabled]'"
            :label="'Number of cryptocurrencies'"
          />
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Ensure a diversified portfolio by adhering to the maximum or minimum
          limit on the number of cryptocurrencies in your wallet.
        </p>
      </div>
      <div
        v-if="form.data.cryptocurrency.enabled"
        class="border-t border-gray-200 px-4 py-5 sm:px-6"
      >
        <div class="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-6">
          <FormInput
            :id="'cryptocurrency-min'"
            v-model="form.data.cryptocurrency.min"
            :name="'cryptocurrency[min]'"
            :type="'number'"
            :min="0"
            :label="'Minimum number of cryptocurrencies'"
            :error="fieldError('cryptocurrency.min')"
            class="md:col-span-3"
          />

          <FormInput
            :id="'cryptocurrency-max'"
            v-model="form.data.cryptocurrency.max"
            :name="'cryptocurrency[max]'"
            :type="'number'"
            :min="0"
            :label="'Maximum number of cryptocurrencies'"
            :error="fieldError('cryptocurrency.max')"
            class="md:col-span-3"
          />
        </div>
      </div>
    </div>

    <div class="overflow-hidden rounded bg-white shadow md:rounded-lg">
      <div class="bg-white px-4 py-5 sm:px-6">
        <h3 class="mb-2 text-base font-semibold leading-6 text-gray-900">
          <FormCheckbox
            :id="'market-cap-enabled'"
            v-model="form.data.marketCap.enabled"
            :name="'marketCap[enabled]'"
            :label="'Market cap'"
          />
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Optimize your portfolio's resilience by aligning your cryptocurrencies
          with specified market cap groups.
        </p>
      </div>
      <div
        v-if="form.data.marketCap.enabled"
        class="border-t border-gray-200 px-4 py-5 sm:px-6"
      >
        <div class="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-6">
          <div class="col-span-full">
            <FormSlider
              v-model="form.data.marketCap.margin"
              :name="'marketCap[margin]'"
              :label="'Margin'"
              :min="3"
              :max="15"
              :step="1"
              :unit="'%'"
              :hint="'Margin represents a value that indicates the range in which the real value of the given group must occur. If the value of the margin is 2% and the resulting weight of the group in the portfolio is 15%, then the real value must be in the range of 13% - 17%. This gives us more safe space to trigger warnings in your portfolio. Min. value is 3%.'"
            />
          </div>

          <div
            class="col-span-full rounded bg-gray-50 p-4 shadow-sm md:rounded-lg"
          >
            <div>
              <FormCheckbox
                :id="'market-cap-micro-enabled'"
                v-model="form.data.marketCap.microEnabled"
                :name="'marketCap[microEnabled]'"
                :label="'Micro market cap (< 250m $)'"
              />
            </div>
            <FormSlider
              v-model="form.data.marketCap.micro"
              :name="'marketCap[micro]'"
              :label="'Micro market cap (< 250m $)'"
              :min="0"
              :max="100"
              :step="5"
              :disabled="!form.data.marketCap.microEnabled"
              :unit="'%'"
              label-hidden
            />
          </div>

          <div
            class="col-span-full rounded bg-gray-50 p-4 shadow-sm md:rounded-lg"
          >
            <div>
              <FormCheckbox
                :id="'market-cap-small-enabled'"
                v-model="form.data.marketCap.smallEnabled"
                :name="'marketCap[smallEnabled]'"
                :label="'Small market cap (>= 250m $ and < 2b $)'"
              />
            </div>
            <FormSlider
              v-model="form.data.marketCap.small"
              :name="'marketCap[small]'"
              :label="'Small market cap (>= 250m $ and < 2b $)'"
              :min="0"
              :max="100"
              :step="5"
              :disabled="!form.data.marketCap.smallEnabled"
              :unit="'%'"
              label-hidden
            />
          </div>

          <div
            class="col-span-full rounded bg-gray-50 p-4 shadow-sm md:rounded-lg"
          >
            <div>
              <FormCheckbox
                :id="'market-cap-mid-enabled'"
                v-model="form.data.marketCap.midEnabled"
                :name="'marketCap[midEnabled]'"
                :label="'Mid market cap (>= 2b $ and < 10b $)'"
              />
            </div>
            <FormSlider
              v-model="form.data.marketCap.mid"
              :name="'marketCap[mid]'"
              :label="'Mid market cap (>= 2b $ and < 10b $)'"
              :min="0"
              :max="100"
              :step="5"
              :disabled="!form.data.marketCap.midEnabled"
              :unit="'%'"
              label-hidden
            />
          </div>

          <div
            class="col-span-full rounded bg-gray-50 p-4 shadow-sm md:rounded-lg"
          >
            <div>
              <FormCheckbox
                :id="'market-cap-large-enabled'"
                v-model="form.data.marketCap.largeEnabled"
                :name="'marketCap[largeEnabled]'"
                :label="'Large market cap (>= 10b and < 200b $)'"
              />
            </div>
            <FormSlider
              v-model="form.data.marketCap.large"
              :name="'marketCap[large]'"
              :label="'Large market cap (>= 10b and < 200b $)'"
              :min="0"
              :max="100"
              :step="5"
              :disabled="!form.data.marketCap.largeEnabled"
              :unit="'%'"
              label-hidden
            />
          </div>

          <div
            class="col-span-full rounded bg-gray-50 p-4 shadow-sm md:rounded-lg"
          >
            <div>
              <FormCheckbox
                :id="'market-cap-mega-enabled'"
                v-model="form.data.marketCap.megaEnabled"
                :name="'marketCap[megaEnabled]'"
                :label="'Mega market cap (>= 200b $)'"
              />
            </div>
            <FormSlider
              v-model="form.data.marketCap.mega"
              :name="'marketCap[mega]'"
              :label="'Mega market cap (>= 200b $)'"
              :min="0"
              :max="100"
              :step="5"
              :disabled="!form.data.marketCap.megaEnabled"
              :unit="'%'"
              label-hidden
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useContext, watch } from '@nuxtjs/composition-api'
import { useForm, useFormData } from '~/composables/forms/form'
import { LimitsForm, LimitsMarketCapForm } from '~/types/forms/Limits'

const { $_ } = useContext()
const { fieldError } = useForm()
const { createForm } = useFormData()

const form = createForm<LimitsForm>({
  trade: {
    enabled: false,
    daily: null,
    weekly: null,
    monthly: null
  },
  cryptocurrency: {
    enabled: false,
    min: null,
    max: null
  },
  marketCap: {
    enabled: false,
    margin: null,
    microEnabled: false,
    micro: null,
    smallEnabled: false,
    small: null,
    midEnabled: false,
    mid: null,
    largeEnabled: false,
    large: null,
    megaEnabled: false,
    mega: null
  }
})

watch(
  () => form.data.trade.enabled,
  (value) => (value ? null : form.reset('trade', 'enabled'))
)

watch(
  () => form.data.cryptocurrency.enabled,
  (value) => (value ? null : form.reset('cryptocurrency', 'enabled'))
)

watch(
  () => form.data.marketCap.enabled,
  (value) => (value ? null : form.reset('marketCap', 'enabled'))
)

const makeCheckboxWatcher =
  (prop: keyof LimitsMarketCapForm) => (value: boolean) => {
    if (!value) {
      form.reset('marketCap', null, prop)
    }
  }

watch(() => form.data.marketCap.microEnabled, makeCheckboxWatcher('micro'))
watch(() => form.data.marketCap.smallEnabled, makeCheckboxWatcher('small'))
watch(() => form.data.marketCap.midEnabled, makeCheckboxWatcher('mid'))
watch(() => form.data.marketCap.largeEnabled, makeCheckboxWatcher('large'))
watch(() => form.data.marketCap.megaEnabled, makeCheckboxWatcher('mega'))

const makeSliderWatcher = (watchedProp: keyof LimitsMarketCapForm) => () => {
  const props: (keyof LimitsMarketCapForm)[] = [
    'micro',
    'small',
    'mid',
    'large',
    'mega'
  ]

  const totalValue =
    (form.data.marketCap.micro ?? 0) +
    (form.data.marketCap.small ?? 0) +
    (form.data.marketCap.mid ?? 0) +
    (form.data.marketCap.large ?? 0) +
    (form.data.marketCap.mega ?? 0)

  // no need to recalculate anything
  if (totalValue <= 100) {
    return
  }

  let valueToSubtract = totalValue - 100

  for (const prop of props) {
    if (prop === watchedProp) {
      continue
    }

    const value = ($_.get(form.data.marketCap, prop) ?? 0) as number

    if (valueToSubtract > value) {
      valueToSubtract -= value

      $_.set(form.data.marketCap, prop, 0)

      continue
    }

    $_.set(form.data.marketCap, prop, value - valueToSubtract)

    break
  }
}

watch(() => form.data.marketCap.micro, makeSliderWatcher('micro'))
watch(() => form.data.marketCap.small, makeSliderWatcher('small'))
watch(() => form.data.marketCap.mid, makeSliderWatcher('mid'))
watch(() => form.data.marketCap.large, makeSliderWatcher('large'))
watch(() => form.data.marketCap.mega, makeSliderWatcher('mega'))
</script>

<script lang="ts">
export default {
  name: 'AppSettingsLimitsPage',
  layout: 'app'
}
</script>
