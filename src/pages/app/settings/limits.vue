<template>
  <div>
    <!-- loading spinner -->
    <div
      v-if="limits === null"
      class="flex items-center justify-center rounded border-2 border-dashed border-indigo-50 p-5 md:rounded-lg"
    >
      <CommonSpinner :type="'primary'" :size="10" />
    </div>

    <!-- limits form -->
    <form v-else method="POST" class="space-y-5" @submit.prevent="updateLimits">
      <CommonAlertOnce
        :identifier="'settings-limits-alert'"
        :type="'info'"
        :message="$t('pages.user.settings.limits.alert').toString()"
      />

      <div
        class="overflow-hidden rounded border border-gray-200 bg-white md:rounded-lg"
      >
        <div class="px-4 py-5 sm:px-6">
          <h3 class="mb-2 text-base leading-6 text-gray-900">
            <FormCheckbox
              :id="'trade-enabled'"
              v-model="form.data.trade.enabled"
              :name="'trade[enabled]'"
              :label="
                $t('forms.user.settings.limits.trade.title.label').toString()
              "
              :disabled="lock && !lock.enabled"
              :error="fieldError('trade.enabled')"
            />
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ $t('forms.user.settings.limits.trade.title.hint') }}
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
              :label="$t('forms.user.settings.limits.trade.daily').toString()"
              :error="fieldError('trade.daily')"
              :disabled="lock && !lock.enabled"
              class="md:col-span-2"
            />

            <FormInput
              :id="'trade-weekly'"
              v-model="form.data.trade.weekly"
              :name="'trade[weekly]'"
              :type="'number'"
              :min="0"
              :label="$t('forms.user.settings.limits.trade.weekly').toString()"
              :error="fieldError('trade.weekly')"
              :disabled="lock && !lock.enabled"
              class="md:col-span-2"
            />

            <FormInput
              :id="'trade-monthly'"
              v-model="form.data.trade.monthly"
              :name="'trade[monthly]'"
              :type="'number'"
              :min="0"
              :label="$t('forms.user.settings.limits.trade.monthly').toString()"
              :error="fieldError('trade.monthly')"
              :disabled="lock && !lock.enabled"
              class="md:col-span-2"
            />
          </div>
        </div>
      </div>

      <div
        class="overflow-hidden rounded border border-gray-200 bg-white md:rounded-lg"
      >
        <div class="px-4 py-5 sm:px-6">
          <h3 class="mb-2 text-base leading-6 text-gray-900">
            <FormCheckbox
              :id="'cryptocurrency-enabled'"
              v-model="form.data.cryptocurrency.enabled"
              :name="'cryptocurrency[enabled]'"
              :label="
                $t(
                  'forms.user.settings.limits.cryptocurrency.title.label'
                ).toString()
              "
              :disabled="lock && !lock.enabled"
              :error="fieldError('cryptocurrency.enabled')"
            />
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ $t('forms.user.settings.limits.cryptocurrency.title.hint') }}
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
              :label="
                $t('forms.user.settings.limits.cryptocurrency.min').toString()
              "
              :error="fieldError('cryptocurrency.min')"
              :disabled="lock && !lock.enabled"
              class="md:col-span-3"
            />

            <FormInput
              :id="'cryptocurrency-max'"
              v-model="form.data.cryptocurrency.max"
              :name="'cryptocurrency[max]'"
              :type="'number'"
              :min="0"
              :label="
                $t('forms.user.settings.limits.cryptocurrency.max').toString()
              "
              :error="fieldError('cryptocurrency.max')"
              :disabled="lock && !lock.enabled"
              class="md:col-span-3"
            />

            <FormSelect
              :id="'cryptocurrency-period'"
              v-model="form.data.cryptocurrency.period"
              :name="'cryptocurrency[period]'"
              :label="$t('forms.user.settings.limits.period.label').toString()"
              :hint="$t('forms.user.settings.limits.period.hint').toString()"
              :error="fieldError('cryptocurrency.period')"
              :options="periodSelectOptions"
              :disabled="lock && !lock.enabled"
              add-empty-option
              class="md:col-span-3"
            />
          </div>
        </div>
      </div>

      <div
        class="overflow-hidden rounded border border-gray-200 bg-white md:rounded-lg"
      >
        <div class="px-4 py-5 sm:px-6">
          <h3 class="mb-2 text-base leading-6 text-gray-900">
            <FormCheckbox
              :id="'market-cap-enabled'"
              v-model="form.data.marketCap.enabled"
              :name="'marketCap[enabled]'"
              :label="
                $t(
                  'forms.user.settings.limits.marketCap.title.label'
                ).toString()
              "
              :disabled="lock && !lock.enabled"
              :error="fieldError('marketCap.enabled')"
            />
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ $t('forms.user.settings.limits.marketCap.title.hint') }}
          </p>
        </div>
        <div
          v-if="form.data.marketCap.enabled"
          class="border-t border-gray-200 px-4 py-5 sm:px-6"
        >
          <div class="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-6">
            <div class="col-span-full">
              <FormSlider
                :id="'market-cap-margin'"
                v-model="form.data.marketCap.margin"
                :name="'marketCap[margin]'"
                :label="
                  $t(
                    'forms.user.settings.limits.marketCap.margin.label'
                  ).toString()
                "
                :min="3"
                :max="15"
                :step="1"
                :unit="'%'"
                :hint="
                  $t('forms.user.settings.limits.marketCap.margin.hint', {
                    min: 3
                  }).toString()
                "
                :disabled="lock && !lock.enabled"
              />
            </div>

            <div class="md:col-span-3">
              <FormSelect
                :id="'market-cap-period'"
                v-model="form.data.marketCap.period"
                :name="'marketCap[period]'"
                :label="
                  $t('forms.user.settings.limits.period.label').toString()
                "
                :hint="$t('forms.user.settings.limits.period.hint').toString()"
                :error="fieldError('marketCap.period')"
                :options="periodSelectOptions"
                :disabled="lock && !lock.enabled"
                add-empty-option
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
                  :label="
                    $t(
                      'models.currency.marketCapCategory.long.micro'
                    ).toString()
                  "
                  :disabled="lock && !lock.enabled"
                  :error="fieldError('marketCap.microEnabled')"
                />
              </div>
              <FormSlider
                :id="'market-cap-micro'"
                v-model="form.data.marketCap.micro"
                :name="'marketCap[micro]'"
                :label="
                  $t('models.currency.marketCapCategory.long.micro').toString()
                "
                :min="0"
                :max="100"
                :step="5"
                :disabled="
                  !form.data.marketCap.microEnabled || (lock && !lock.enabled)
                "
                :unit="'%'"
                :hint="
                  getSliderHint(
                    form.data.marketCap.microEnabled,
                    form.data.marketCap.micro
                  )
                "
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
                  :label="
                    $t(
                      'models.currency.marketCapCategory.long.small'
                    ).toString()
                  "
                  :disabled="lock && !lock.enabled"
                  :error="fieldError('marketCap.smallEnabled')"
                />
              </div>
              <FormSlider
                :id="'market-cap-small'"
                v-model="form.data.marketCap.small"
                :name="'marketCap[small]'"
                :label="
                  $t('models.currency.marketCapCategory.long.small').toString()
                "
                :min="0"
                :max="100"
                :step="5"
                :disabled="
                  !form.data.marketCap.smallEnabled || (lock && !lock.enabled)
                "
                :unit="'%'"
                :hint="
                  getSliderHint(
                    form.data.marketCap.smallEnabled,
                    form.data.marketCap.small
                  )
                "
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
                  :label="
                    $t('models.currency.marketCapCategory.long.mid').toString()
                  "
                  :disabled="lock && !lock.enabled"
                  :error="fieldError('marketCap.midEnabled')"
                />
              </div>
              <FormSlider
                :id="'market-cap-mid'"
                v-model="form.data.marketCap.mid"
                :name="'marketCap[mid]'"
                :label="
                  $t('models.currency.marketCapCategory.long.mid').toString()
                "
                :min="0"
                :max="100"
                :step="5"
                :disabled="
                  !form.data.marketCap.midEnabled || (lock && !lock.enabled)
                "
                :unit="'%'"
                :hint="
                  getSliderHint(
                    form.data.marketCap.midEnabled,
                    form.data.marketCap.mid
                  )
                "
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
                  :label="
                    $t(
                      'models.currency.marketCapCategory.long.large'
                    ).toString()
                  "
                  :disabled="lock && !lock.enabled"
                  :error="fieldError('marketCap.largeEnabled')"
                />
              </div>
              <FormSlider
                :id="'market-cap-large'"
                v-model="form.data.marketCap.large"
                :name="'marketCap[large]'"
                :label="
                  $t('models.currency.marketCapCategory.long.large').toString()
                "
                :min="0"
                :max="100"
                :step="5"
                :disabled="
                  !form.data.marketCap.largeEnabled || (lock && !lock.enabled)
                "
                :unit="'%'"
                :hint="
                  getSliderHint(
                    form.data.marketCap.largeEnabled,
                    form.data.marketCap.large
                  )
                "
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
                  :label="
                    $t('models.currency.marketCapCategory.long.mega').toString()
                  "
                  :disabled="lock && !lock.enabled"
                  :error="fieldError('marketCap.megaEnabled')"
                />
              </div>
              <FormSlider
                :id="'market-cap-mega'"
                v-model="form.data.marketCap.mega"
                :name="'marketCap[mega]'"
                :label="
                  $t('models.currency.marketCapCategory.long.mega').toString()
                "
                :min="0"
                :max="100"
                :step="5"
                :disabled="
                  !form.data.marketCap.megaEnabled || (lock && !lock.enabled)
                "
                :unit="'%'"
                :hint="
                  getSliderHint(
                    form.data.marketCap.megaEnabled,
                    form.data.marketCap.mega
                  )
                "
                label-hidden
              />
            </div>
          </div>
        </div>
      </div>

      <CommonAlert
        v-if="lock && !lock.enabled"
        class="flex-grow"
        :type="'warning'"
        :message="
          $t('toasts.user.settings.limits.locked', {
            datetime: lock.resetAt
          }).toString()
        "
      />

      <div
        v-else
        class="overflow-hidden rounded border border-gray-200 bg-white md:rounded-lg"
      >
        <div class="flex justify-end px-4 py-5 sm:px-6">
          <CommonButton
            :label="$t('common.buttons.update').toString()"
            :type="'submit'"
            :size="4"
            :is-loading="isLoading"
          />
        </div>
      </div>
    </form>
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
import { AxiosResponse } from 'axios'
import { useForm, useFormData } from '~/composables/forms/form'
import { LimitsForm, LimitsMarketCapForm } from '~/types/forms/Limits'
import { useLoading } from '~/composables/loading'
import {
  InvalidContentResponse,
  JsonResponse,
  LimitsLockedResponse,
  LimitsShowResponse
} from '~/types/http/Responses'
import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import { Limits, LimitsLock } from '~/types/http/Entities'
import { FormSelectOption } from '~/types/common/Form'
import { LIMITS_NOTIFICATION_PERIOD } from '~/enums/settings/LimitsNotificationPeriodEnum'

const { $_, i18n, $repositories, $toast } = useContext()
const { fieldError, clearErrors, parseErrors } = useForm()
const { createForm } = useFormData()
const { isLoading, setIsLoading } = useLoading()

const limits = ref<Limits | null>(null)
const lock = ref<LimitsLock | null>(null)

const periodSelectOptions = computed<FormSelectOption[]>(
  (): FormSelectOption[] =>
    Object.values(LIMITS_NOTIFICATION_PERIOD).map(
      (period: LIMITS_NOTIFICATION_PERIOD): FormSelectOption => ({
        value: period,
        label: i18n.t(`models.limits.period.${period}`).toString()
      })
    )
)

const form = createForm<LimitsForm>({
  trade: {
    enabled: false,
    daily: null,
    weekly: null,
    monthly: null
  },
  cryptocurrency: {
    enabled: false,
    period: null,
    min: null,
    max: null
  },
  marketCap: {
    enabled: false,
    period: null,
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

const response = useAsync<LimitsShowResponse>(async () => {
  return await $repositories.userSettings
    .showLimits()
    .then((response) => response.data)
}, 'limits')

function copyValuesToForm(limits: Limits): void {
  if (limits.trade.enabled) {
    Object.assign(
      form.data.trade,
      $_.pick(limits.trade, ['enabled', 'daily', 'weekly', 'monthly'])
    )
  }

  if (limits.cryptocurrency.enabled) {
    Object.assign(
      form.data.cryptocurrency,
      $_.pick(limits.cryptocurrency, ['enabled', 'period', 'min', 'max'])
    )
  }

  if (limits.marketCap.enabled) {
    form.data.marketCap.enabled = true
    form.data.marketCap.period = limits.marketCap.period
    form.data.marketCap.margin = limits.marketCap.margin

    if (limits.marketCap.micro.enabled) {
      form.data.marketCap.microEnabled = true
      form.data.marketCap.micro = limits.marketCap.micro.value
    }

    if (limits.marketCap.small.enabled) {
      form.data.marketCap.smallEnabled = true
      form.data.marketCap.small = limits.marketCap.small.value
    }

    if (limits.marketCap.mid.enabled) {
      form.data.marketCap.midEnabled = true
      form.data.marketCap.mid = limits.marketCap.mid.value
    }

    if (limits.marketCap.large.enabled) {
      form.data.marketCap.largeEnabled = true
      form.data.marketCap.large = limits.marketCap.large.value
    }

    if (limits.marketCap.mega.enabled) {
      form.data.marketCap.megaEnabled = true
      form.data.marketCap.mega = limits.marketCap.mega.value
    }
  }
}

watch(
  () => response.value,
  (response: LimitsShowResponse | null): void => {
    if (!response) {
      return
    }

    copyValuesToForm(response.data.limits)

    limits.value = response.data.limits
    lock.value = response.data.lock
  },
  {
    immediate: true
  }
)

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

const makeSliderWatcher = (prop: keyof LimitsMarketCapForm) => () => {
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

  for (const p of props) {
    // do not subtract anything from currently
    // changed value
    if (p === prop) {
      continue
    }

    const value = ($_.get(form.data.marketCap, p) ?? 0) as number

    if (valueToSubtract > value) {
      valueToSubtract -= value

      $_.set(form.data.marketCap, p, 0)

      continue
    }

    $_.set(form.data.marketCap, p, value - valueToSubtract)

    break
  }
}

watch(() => form.data.marketCap.micro, makeSliderWatcher('micro'))
watch(() => form.data.marketCap.small, makeSliderWatcher('small'))
watch(() => form.data.marketCap.mid, makeSliderWatcher('mid'))
watch(() => form.data.marketCap.large, makeSliderWatcher('large'))
watch(() => form.data.marketCap.mega, makeSliderWatcher('mega'))

function getSliderHint(enabled: boolean, value: number | null): string | null {
  if (!enabled || value === null) {
    return null
  }

  let min = value - (form.data.marketCap.margin ?? 0)
  let max = value + (form.data.marketCap.margin ?? 0)

  if (min < 0) {
    min = 0
  }

  if (max > 100) {
    max = 100
  }

  return i18n
    .t('forms.user.settings.limits.marketCap.sliderHint', { min, max })
    .toString()
}

async function updateLimits(): Promise<void> {
  setIsLoading(true)

  try {
    const { data } = await $repositories.userSettings.updateLimits(form.data)

    clearErrors()

    // copy retrieved values to form just in case
    copyValuesToForm(data.data.limits)

    // update refs
    limits.value = data.data.limits
    lock.value = data.data.lock

    $toast.success({
      title: i18n.t('toasts.user.settings.limits.success').toString()
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

    if (response.data.code === RESPONSE_CODE.LIMITS_LOCKED) {
      $toast.error({
        title: i18n
          .t('toasts.user.settings.limits.locked', {
            datetime: (response.data as LimitsLockedResponse).data.resetAt
          })
          .toString()
      })

      return
    }

    $toast.error({
      title: i18n.t('toasts.common.somethingWentWrong').toString()
    })
  } finally {
    setIsLoading(false)
  }
}
</script>

<script lang="ts">
export default {
  name: 'AppSettingsLimitsPage',
  layout: 'app'
}
</script>
