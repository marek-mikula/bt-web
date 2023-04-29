<template>
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <div>
      <h2 class="mt-6 text-4xl font-bold tracking-tight text-gray-900">
        {{ $t('pages.mfa.verifyDevice.title') }}
      </h2>
      <p class="mt-2 text-gray-600">
        {{ $t('pages.mfa.verifyDevice.subtitle') }}
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
            v-model="form.code"
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
              :label="$t('forms.mfa.verifyDevice.submit').toString()"
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
import {
  reactive,
  useContext,
  useRoute,
  useRouter
} from '@nuxtjs/composition-api'
import { AxiosResponse } from 'axios'
import VerifyForm from '~/types/forms/Mfa/VerifyForm'
import JsonResponse from '~/types/http/responses/JsonResponse'
import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import InvalidContentResponse from '~/types/http/responses/InvalidContentResponse'
import { useForm } from '~/composables/forms/form'

const route = useRoute()
const router = useRouter()
const { $repositories, $auth, $toast, i18n } = useContext()
const { isLoading, setIsLoading, clearErrors, fieldError, parseErrors } =
  useForm()

const form: VerifyForm = reactive({
  code: null
})

async function verify(): Promise<void> {
  setIsLoading(true)

  try {
    const response = await $repositories.mfa.verifyDevice(
      route.value.query.token as string,
      form
    )

    clearErrors()

    await $auth.setUserToken(
      response.data.data.token.accessToken,
      response.data.data.token.refreshToken
    )

    $toast.success({
      title: i18n.t('toasts.mfa.verifyDevice.success').toString()
    })

    await router.push({ path: '/app' })
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

    if (response.data.code === RESPONSE_CODE.INVALID_OR_MISSING_MFA_TOKEN) {
      $toast.error({
        title: i18n.t('toasts.mfa.invalidToken').toString()
      })

      return
    }

    if (response.data.code === RESPONSE_CODE.INVALID_MFA_CODE) {
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
  name: 'MfaVerifyDevicePage',
  layout: 'auth',
  auth: 'guest'
}
</script>
