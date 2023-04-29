<template>
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <div>
      <h2 class="mt-6 text-4xl font-bold tracking-tight text-gray-900">
        {{ $t('pages.passwordReset.title') }}
      </h2>
      <p class="mt-2 text-gray-600">
        {{ $t('pages.passwordReset.subtitle') }}
      </p>
    </div>

    <div class="mt-8">
      <div class="mt-6">
        <form
          action="#"
          method="POST"
          class="space-y-6"
          @submit.prevent="sendEmail"
        >
          <FormInput
            v-model="form.email"
            :name="'email'"
            :type="'email'"
            :label="$t('forms.passwordReset.email').toString()"
            :autocomplete="'email'"
            :error="fieldError('email')"
            required
          />

          <div>
            <CommonButton
              :label="$t('forms.passwordReset.submit').toString()"
              :type="'submit'"
              :size="4"
              :is-loading="isLoading"
              block
            />

            <NuxtLink
              to="/"
              class="mt-3 flex inline-flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {{ $t('common.buttons.backToLogin') }}
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, useContext } from '@nuxtjs/composition-api'
import { AxiosResponse } from 'axios'
import JsonResponse from '~/types/http/responses/JsonResponse'
import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import InvalidContentResponse from '~/types/http/responses/InvalidContentResponse'
import { useForm } from '~/composables/forms/form'
import SendEmailForm from '~/types/forms/PasswordReset/SendEmailForm'

const { $repositories, $toast, i18n } = useContext()
const { isLoading, setIsLoading, clearErrors, fieldError, parseErrors } =
  useForm()

const form: SendEmailForm = reactive({
  email: null
})

async function sendEmail(): Promise<void> {
  setIsLoading(true)

  try {
    await $repositories.passwordReset.sendEmail(form)

    clearErrors()

    $toast.success({
      title: i18n.t('toasts.passwordReset.emailSent').toString()
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
  name: 'PasswordResetPage',
  layout: 'auth',
  auth: 'guest'
}
</script>
