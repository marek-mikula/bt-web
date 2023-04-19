<template>
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <div>
      <h2 class="mt-6 text-4xl font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <p class="mt-2 text-gray-600">
        Or
        <NuxtLink
          to="/register"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          create a new account
        </NuxtLink>
      </p>
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
            :label="'Email Address'"
            :autocomplete="'email'"
            :error="fieldError('email')"
            required
          />

          <FormInput
            v-model="form.password"
            :name="'password'"
            :type="'password'"
            :label="'Password'"
            :autocomplete="'current-password'"
            :error="fieldError('password')"
            required
          />

          <div class="flex items-center justify-between">
            <FormCheckbox
              :id="'remember-me'"
              v-model="form.rememberMe"
              :name="'rememberMe'"
              :label="'Remember me'"
              :error="fieldError('rememberMe')"
            />

            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
                >Forgot your password?</a
              >
            </div>
          </div>

          <div>
            <CommonButton
              :label="'Sign in'"
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
import { reactive, useContext, useRouter } from '@nuxtjs/composition-api'
import { AxiosResponse } from 'axios'
import LoginForm from '~/types/forms/Auth/LoginForm'
import JsonResponse from '~/types/http/responses/JsonResponse'
import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import InvalidContentResponse from '~/types/http/responses/InvalidContentResponse'
import { useForm } from '~/composables/forms/form'
import MfaTokenResponse from '~/types/http/responses/MfaTokenResponse'
import { MFA_TOKEN_TYPE } from '~/enums/MfaTokenType'

const { $repositories, $auth } = useContext()
const { isLoading, setIsLoading, clearErrors, fieldError, parseErrors } =
  useForm()
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

    await router.push({ path: '/app' })
  } catch (e: any) {
    const response: AxiosResponse<JsonResponse> = e.response

    if (response.data.code === RESPONSE_CODE.INVALID_CONTENT) {
      parseErrors(response.data as InvalidContentResponse)

      return
    }

    clearErrors()

    if (response.data.code === RESPONSE_CODE.INVALID_CREDENTIALS) {
      // show invalid credentials error

      return
    }

    // show common error
  } finally {
    setIsLoading(false)
  }
}

async function redirectToMfa(data: MfaTokenResponse): Promise<void> {
  const route =
    data.data.token.type === MFA_TOKEN_TYPE.VERIFY_DEVICE
      ? '/mfa/verify-device'
      : '/mfa/verify-email'

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
