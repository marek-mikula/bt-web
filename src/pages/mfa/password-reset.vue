<template>
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <div>
      <h2 class="mt-6 text-4xl font-bold tracking-tight text-gray-900">
        Reset password
      </h2>
      <p class="mt-2 text-gray-600">
        Please enter your new password and secret code from the email we sent
        you.
      </p>
    </div>

    <div class="mt-8">
      <div class="mt-6">
        <form
          action="#"
          method="POST"
          class="space-y-6"
          @submit.prevent="resetPassword"
        >
          <FormInput
            v-model="form.code"
            :name="'code'"
            :type="'text'"
            :label="'Verification code'"
            :placeholder="'l8s21k'"
            :error="fieldError('code')"
            :maxlength="6"
            :hint="'Enter 6-characters long verification code.'"
            required
          />

          <FormInput
            v-model="form.password"
            :name="'password'"
            :type="'password'"
            :label="'Password'"
            :autocomplete="'new-password'"
            :hint="'Min. 8 characters. Must contain at least one symbol, number and mixed case letters.'"
            :error="fieldError('password')"
            required
          />

          <FormInput
            :id="'password-confirm'"
            v-model="form.passwordConfirm"
            :name="'passwordConfirm'"
            :type="'password'"
            :label="'Password confirmation'"
            :autocomplete="'new-password'"
            :error="fieldError('passwordConfirm')"
            required
          />

          <div>
            <CommonButton
              :label="'Reset password'"
              :type="'submit'"
              :size="4"
              :is-loading="isLoading"
              block
            />

            <NuxtLink
              to="/"
              class="mt-3 flex inline-flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Back to login
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
import JsonResponse from '~/types/http/responses/JsonResponse'
import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import InvalidContentResponse from '~/types/http/responses/InvalidContentResponse'
import { useForm } from '~/composables/forms/form'
import ResetPasswordForm from '~/types/forms/Mfa/ResetPasswordForm'

const route = useRoute()
const router = useRouter()
const { $repositories } = useContext()
const { isLoading, setIsLoading, clearErrors, fieldError, parseErrors } =
  useForm()

const form: ResetPasswordForm = reactive({
  code: null,
  password: null,
  passwordConfirm: null
})

async function resetPassword(): Promise<void> {
  setIsLoading(true)

  try {
    await $repositories.mfa.resetPassword(
      route.value.query.token as string,
      form
    )

    await router.push({ path: '/' })
  } catch (e: any) {
    const response: AxiosResponse<JsonResponse> = e.response

    if (response.data.code === RESPONSE_CODE.INVALID_CONTENT) {
      parseErrors(response.data as InvalidContentResponse)

      return
    }

    clearErrors()

    if (response.data.code === RESPONSE_CODE.INVALID_MFA_CODE) {
      // show invalid MFA code error

      return
    }

    // show common error
  } finally {
    setIsLoading(false)
  }
}
</script>

<script lang="ts">
export default {
  name: 'MfaPasswordResetPage',
  layout: 'auth',
  auth: 'guest'
}
</script>
