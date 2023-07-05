<template>
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <div>
      <h2 class="mt-6 text-4xl font-bold tracking-tight text-gray-900">
        {{ $t('pages.login.title') }}
      </h2>
    </div>

    <div class="mt-8">
      <div class="mt-6">
        <form
          action="#"
          method="POST"
          class="space-y-6"
          @submit.prevent="login"
        >
          <FormInput
            v-model="form.email"
            :name="'email'"
            :type="'email'"
            :label="$t('forms.login.email').toString()"
            :autocomplete="'email'"
            :error="fieldError('email')"
            required
          />

          <FormInput
            v-model="form.password"
            :name="'password'"
            :type="'password'"
            :label="$t('forms.login.password').toString()"
            :autocomplete="'current-password'"
            :error="fieldError('password')"
            required
          />

          <div class="flex items-center justify-between">
            <FormCheckbox
              :id="'remember-me'"
              v-model="form.rememberMe"
              :name="'rememberMe'"
              :label="$t('forms.login.rememberMe').toString()"
              :error="fieldError('rememberMe')"
            />

            <div class="text-sm">
              <NuxtLink
                to="/password-reset"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {{ $t('pages.login.forgottenPassword') }}
              </NuxtLink>
            </div>
          </div>

          <div>
            <CommonButton
              :label="$t('forms.login.submit').toString()"
              :type="'submit'"
              :is-loading="isLoading"
              :size="4"
              block
            />

            <NuxtLink
              to="/register"
              class="mt-3 flex inline-flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {{ $t('pages.login.createNewAccount') }}
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, useContext, useRouter } from '@nuxtjs/composition-api'
import { AxiosResponse } from 'axios'
import LoginForm from '~/types/forms/Auth/LoginForm'
import JsonResponse from '~/types/http/responses/JsonResponse'
import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import InvalidContentResponse from '~/types/http/responses/InvalidContentResponse'
import { useForm } from '~/composables/forms/form'
import MfaTokenResponse from '~/types/http/responses/MfaTokenResponse'
import { MFA_TOKEN_TYPE } from '~/enums/MfaTokenType'
import { useLoading } from '~/composables/loading'

const { $repositories, $auth, $toast, i18n } = useContext()
const { clearErrors, fieldError, parseErrors } = useForm()
const { isLoading, setIsLoading } = useLoading()

const router = useRouter()

const form: LoginForm = reactive({
  email: null,
  password: null,
  rememberMe: false
})

async function login(): Promise<void> {
  setIsLoading(true)

  try {
    const response = await $repositories.auth.login(form)

    clearErrors()

    if (response.data.code === RESPONSE_CODE.MFA_TOKEN) {
      await redirectToMfa(response.data as MfaTokenResponse)

      return
    }

    await $auth.setUserToken(
      response.data.data.token.accessToken,
      response.data.data.token.refreshToken
    )

    $toast.success({
      title: i18n.t('toasts.login.loggedIn').toString()
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

    if (response.data.code === RESPONSE_CODE.INVALID_CREDENTIALS) {
      $toast.error({
        title: i18n.t('toasts.login.invalidCredentials').toString()
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

async function redirectToMfa(data: MfaTokenResponse): Promise<void> {
  const route =
    data.data.token.type === MFA_TOKEN_TYPE.VERIFY_DEVICE
      ? '/mfa/verify-device'
      : '/mfa/verify-email'

  const toastMessage =
    data.data.token.type === MFA_TOKEN_TYPE.VERIFY_DEVICE
      ? 'toasts.login.verifyDevice'
      : 'toasts.login.verifyEmail'

  $toast.info({
    title: i18n.t(toastMessage).toString()
  })

  await router.push({
    path: route,
    query: { token: data.data.token.token }
  })
}
</script>

<script lang="ts">
export default {
  name: 'LoginPage',
  layout: 'auth',
  auth: 'guest'
}
</script>
