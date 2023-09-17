<template>
  <div>
    <!-- form -->
    <form method="POST" class="space-y-5" @submit.prevent="update">
      <div
        class="overflow-hidden rounded border border-gray-200 bg-white md:rounded-lg"
      >
        <div class="px-4 py-5 sm:px-6">
          <h3 class="mb-2 text-base leading-6 text-gray-900">
            <FormCheckbox
              :id="'whale-enabled'"
              v-model="form.data.whale.enabled"
              :name="'whale[enabled]'"
              :label="
                $t('forms.user.settings.notifications.whale.label').toString()
              "
              :error="fieldError('whale.enabled')"
            />
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ $t('forms.user.settings.notifications.whale.hint') }}
          </p>
        </div>
      </div>

      <div
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
import { AxiosResponse } from 'axios'
import { useContext } from '@nuxtjs/composition-api'
import { useForm, useFormData } from '~/composables/forms/form'
import { NotificationsForm } from '~/types/forms/Limits'
import { useLoading } from '~/composables/loading'
import { useUser } from '~/composables/user'
import { InvalidContentResponse, JsonResponse } from '~/types/http/Responses'
import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'

const context = useContext()
const { $repositories, $toast, i18n, store } = context
const { createForm } = useFormData()
const { fieldError, clearErrors, parseErrors } = useForm()
const { isLoading, setIsLoading } = useLoading()
const { getUser } = useUser()

const user = getUser()

const form = createForm<NotificationsForm>({
  whale: {
    enabled: user.value.notifications.whale.enabled
  }
})

async function update(): Promise<void> {
  setIsLoading(true)

  try {
    await $repositories.userSettings.updateNotifications(form.data)

    clearErrors()

    await store.dispatch('auth/fetchUser', context) // update user model

    $toast.success({
      title: i18n.t('toasts.user.settings.notifications.success').toString()
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
</script>

<script lang="ts">
export default {
  name: 'AppSettingsNotificationsPage',
  layout: 'app'
}
</script>
