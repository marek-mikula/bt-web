<template>
  <div class="space-y-4">
    <CommonAlert
      :type="'info'"
      :message="'Limits can be updated only once in 3 days for security reasons. Please be cautious while updating them.'"
    />

    <div class="overflow-hidden rounded-lg bg-white shadow">
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

    <div class="overflow-hidden rounded-lg bg-white shadow">
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

    <div class="overflow-hidden rounded-lg bg-white shadow">
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
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm, useFormData } from '~/composables/forms/form'
import { LimitsForm } from '~/types/forms/Limits'

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
    min: null,
    max: null
  }
})
</script>

<script lang="ts">
export default {
  name: 'AppSettingsLimitsPage',
  layout: 'app'
}
</script>
