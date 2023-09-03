<template>
  <div class="space-y-5">
    <CommonAlertOnce
      :identifier="'settings-alerts-alert'"
      :type="'info'"
      :message="$t('pages.user.settings.alerts.alert').toString()"
    />

    <div class="grid grid-cols-1 gap-5 md:grid-cols-6">
      <!-- loading state -->
      <div class="order-2 col-span-full md:order-1 md:col-span-3 lg:col-span-4">
        <div class="mb-3 flex items-center justify-between">
          <FormCheckbox
            :id="'alerts-only-active'"
            v-model="activeOnly"
            :name="'activeOnly'"
            :label="$t('pages.user.settings.alerts.activeOnly').toString()"
            @change="reFetchAlerts"
          />

          <p v-if="alerts !== null" class="text-xs text-gray-500">
            {{ $tc('common.table.showing', alerts.length) }}
          </p>
        </div>

        <div
          v-if="alerts === null"
          class="flex items-center justify-center rounded bg-gray-100 p-8 md:rounded-lg"
        >
          <CommonSpinner :size="10" />
        </div>

        <!-- empty state -->
        <div
          v-else-if="alerts.length === 0"
          class="rounded border border-gray-200 bg-white py-10 px-5 md:rounded-lg"
        >
          <p class="text-center text-sm text-gray-300">
            {{ $t('common.empty') }}
          </p>
        </div>

        <div
          v-else
          class="rounded border border-gray-200 bg-white md:rounded-lg"
        >
          <ul role="list" class="divide-y divide-gray-100">
            <li
              v-for="alert in alerts"
              :key="alert.id"
              class="flex items-center justify-between gap-x-6 p-5"
            >
              <div class="min-w-0 space-y-2">
                <div class="flex items-center gap-x-2">
                  <p
                    :class="[
                      'text-sm leading-6 text-gray-900',
                      { 'font-semibold': !alert.notifiedAt }
                    ]"
                  >
                    {{ alert.title }}
                  </p>
                  <AlertStateBadge :alert="alert" />
                </div>
                <p v-if="alert.content" class="text-xs leading-5 text-gray-500">
                  {{ alert.content }}
                </p>
                <p class="text-xs text-gray-400">
                  {{ alert.time ? `${alert.date} ${alert.time}` : alert.date }}
                </p>
              </div>
              <div class="flex flex-none items-center">
                <CommonDropdown
                  class="relative flex-none"
                  :identifier="`alert-dropdown-${alert.id}`"
                  horizontal="right"
                  vertical="bottom"
                >
                  <template #button="{ toggle, identifier, state }">
                    <button
                      :id="identifier"
                      type="button"
                      class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
                      :aria-expanded="state ? 'true' : 'false'"
                      aria-haspopup="true"
                      @click.prevent="toggle(true)"
                    >
                      <span class="sr-only">
                        {{ $t('common.buttons.openOptions') }}
                      </span>
                      <svg
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
                        />
                      </svg>
                    </button>
                  </template>
                  <template #list="{ identifier }">
                    <div class="p-1">
                      <a
                        :id="`${identifier}-menu-item-0`"
                        href="#"
                        class="block flex items-center rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-700"
                        role="menuitem"
                        tabindex="-1"
                        @click.prevent="removeAlert(alert)"
                      >
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="mr-2 h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                        {{ $t('common.buttons.delete') }}
                      </a>
                    </div>
                  </template>
                </CommonDropdown>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- form for new alert -->
      <div class="order-1 col-span-full md:order-2 md:col-span-3 lg:col-span-2">
        <form
          method="POST"
          class="overflow-hidden rounded border border-gray-200 bg-white md:rounded-lg"
          @submit.prevent="storeAlert"
        >
          <div class="grid grid-cols-1 gap-y-8 bg-white px-4 py-5 sm:px-6">
            <FormInput
              v-model="form.data.title"
              :name="'title'"
              :type="'text'"
              :label="$t('forms.user.settings.alerts.title').toString()"
              :error="fieldError('title')"
              class="col-span-full"
              :maxlength="255"
              required
            />

            <FormInput
              v-model="form.data.date"
              :name="'date'"
              :type="'date'"
              :label="$t('forms.user.settings.alerts.date').toString()"
              :error="fieldError('date')"
              class="col-span-full"
              required
            />

            <FormInput
              v-model="form.data.time"
              :name="'time'"
              :type="'time'"
              :label="$t('forms.user.settings.alerts.time.label').toString()"
              :step="300"
              :error="fieldError('time')"
              :hint="$t('forms.user.settings.alerts.time.hint').toString()"
              class="col-span-full"
            />

            <FormTextarea
              v-model="form.data.content"
              :name="'content'"
              :label="$t('forms.user.settings.alerts.content').toString()"
              :error="fieldError('content')"
              :rows="3"
              :maxlength="500"
              class="col-span-full"
              show-counter
            />
          </div>

          <div
            class="flex items-end border-t border-gray-200 px-4 py-5 sm:px-6"
          >
            <CommonButton
              :label="$t('common.buttons.create').toString()"
              :type="'submit'"
              :is-loading="isLoading"
              :size="4"
              block
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAsync, useContext, watch } from '@nuxtjs/composition-api'
import { AxiosResponse } from 'axios'
import { useForm, useFormData } from '~/composables/forms/form'
import { AlertForm } from '~/types/forms/Alerts'
import { useLoading } from '~/composables/loading'
import { Alert } from '~/types/http/Entities'
import {
  AlertIndexResponse,
  InvalidContentResponse,
  JsonResponse
} from '~/types/http/Responses'
import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'

const { $repositories, $toast, i18n } = useContext()
const { isLoading, setIsLoading } = useLoading()
const { fieldError, parseErrors, clearErrors } = useForm()
const { createForm } = useFormData()

const alerts = ref<Alert[] | null>(null)

const form = createForm<AlertForm>({
  title: null,
  date: null,
  time: null,
  content: null
})

const activeOnly = ref<boolean>(false)

const response = useAsync<AlertIndexResponse>(async () => {
  return await $repositories.userSettings
    .alertsIndex(activeOnly.value)
    .then((response) => response.data)
}, 'alerts')

watch(
  () => response.value,
  function (response: AlertIndexResponse | null): void {
    if (!response) {
      alerts.value = null
      return
    }

    alerts.value = response.data.alerts
  },
  {
    immediate: true
  }
)

async function reFetchAlerts(): Promise<void> {
  try {
    alerts.value = null

    // re-fetch alerts
    alerts.value = await $repositories.userSettings
      .alertsIndex(activeOnly.value)
      .then((response) => response.data.data.alerts)
  } catch (e: any) {
    $toast.error({
      title: i18n.t('toasts.common.somethingWentWrong').toString()
    })
  }
}

async function removeAlert(alert: Alert): Promise<void> {
  try {
    await $repositories.userSettings.deleteAlert(alert)

    await reFetchAlerts()

    $toast.success({
      title: i18n.t('toasts.alerts.delete.success').toString()
    })
  } catch (e: any) {
    $toast.error({
      title: i18n.t('toasts.common.somethingWentWrong').toString()
    })
  }
}

async function storeAlert(): Promise<void> {
  setIsLoading(true)

  try {
    await $repositories.userSettings.storeAlert(form.data)

    clearErrors()

    await reFetchAlerts()

    form.reset()
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
</script>

<script lang="ts">
export default {
  name: 'AppSettingsAlertsPage',
  layout: 'app'
}
</script>
