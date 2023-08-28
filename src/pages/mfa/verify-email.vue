<template>
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <div>
      <h2 class="mt-6 text-4xl font-bold tracking-tight text-gray-900">
        {{ $t('pages.mfa.verifyEmail.title') }}
      </h2>
      <p class="mt-2 text-gray-600">
        {{ $t('pages.mfa.verifyEmail.subtitle') }}
      </p>
    </div>

    <div class="mt-8">
      <div class="mt-6">
        <form
          action="#"
          method="POST"
          class="space-y-6"
          @submit.prevent="verify"
        >
          <FormInput
            v-model="form.data.code"
            :name="'code'"
            :type="'text'"
            :label="$t('forms.mfa.verificationCode.label').toString()"
            :placeholder="'l8s21k'"
            :error="fieldError('code')"
            :maxlength="6"
            :hint="$t('forms.mfa.verificationCode.hint').toString()"
            required
          />

          <div>
            <CommonButton
              :label="$t('forms.mfa.verifyEmail.submit').toString()"
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
import { useContext, useRoute, useRouter } from '@nuxtjs/composition-api'
import { AxiosResponse } from 'axios'
import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import { useForm, useFormData } from '~/composables/forms/form'
import { useLoading } from '~/composables/loading'
import { VerifyForm } from '~/types/forms/Mfa'
import { InvalidContentResponse, JsonResponse } from '~/types/http/Responses'

const route = useRoute()
const router = useRouter()
const { $repositories, $toast, i18n } = useContext()
const { clearErrors, fieldError, parseErrors } = useForm()
const { createForm } = useFormData()
const { isLoading, setIsLoading } = useLoading()

const form = createForm<VerifyForm>({
  code: null
})

async function verify(): Promise<void> {
  setIsLoading(true)

  try {
    await $repositories.mfa.verifyEmail(
      route.value.query.token as string,
      form.data
    )

    clearErrors()

    $toast.success({
      title: i18n.t('toasts.mfa.verifyEmail.success').toString()
    })

    await router.push({ path: '/' })
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

    if (
      [
        RESPONSE_CODE.MFA_MISSING_TOKEN,
        RESPONSE_CODE.MFA_CORRUPTED_TOKEN,
        RESPONSE_CODE.MFA_INVALID_TOKEN
      ].includes(response.data.code)
    ) {
      $toast.error({
        title: i18n.t('toasts.mfa.invalidToken').toString()
      })

      return
    }

    if (response.data.code === RESPONSE_CODE.MFA_EXPIRED_TOKEN) {
      $toast.error({
        title: i18n.t('toasts.mfa.expiredToken').toString()
      })

      return
    }

    if (response.data.code === RESPONSE_CODE.MFA_INVALID_CODE) {
      $toast.error({
        title: i18n.t('toasts.mfa.invalidCode').toString()
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
  name: 'MfaVerifyEmailPage',
  layout: 'auth'
}
</script>
