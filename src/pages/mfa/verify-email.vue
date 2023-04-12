<template>
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <div>
      <h2 class="mt-6 text-4xl font-bold tracking-tight text-gray-900">
        Verify your email address
      </h2>
      <p class="mt-2 text-gray-600">
        We have sent you a code to your email address. Please enter the code and
        verify your email.
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
            :label="'Verification code'"
            :placeholder="'l8s21k'"
            :error="fieldError('code')"
            :maxlength="6"
            :hint="'Enter 6-characters long verification code.'"
            required
          />

          <div>
            <CommonButton
              :label="'Verify'"
              :type="'submit'"
              :size="4"
              :is-loading="isLoading"
              block
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, useContext, useRoute } from '@nuxtjs/composition-api'
import { AxiosResponse } from 'axios'
import VerifyEmailForm from '~/types/forms/Mfa/VerifyEmailForm'
import JsonResponse from '~/types/http/responses/JsonResponse'
import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import InvalidContentResponse from '~/types/http/responses/InvalidContentResponse'
import { useForm } from '~/composables/forms/form'

const { $repositories, $auth } = useContext()
const { isLoading, setIsLoading, clearErrors, fieldError, parseErrors } =
  useForm()
const route = useRoute()

const form: VerifyEmailForm = reactive({
  code: null
})

async function verify(): Promise<void> {
  setIsLoading(true)

  try {
    const response = await $repositories.mfa.verifyEmail(
      route.value.query.token as string,
      form
    )

    await $auth.setStrategy('laravelJWT')

    await $auth.setUserToken(
      response.data.data.token.accessToken,
      response.data.data.token.refreshToken
    )
  } catch (e: any) {
    const response: AxiosResponse<JsonResponse> = e.response

    if (response.data.code === RESPONSE_CODE.INVALID_CONTENT) {
      parseErrors(response.data as InvalidContentResponse)

      return
    }

    // show common error

    clearErrors()
  } finally {
    setIsLoading(false)
  }
}
</script>

<script lang="ts">
export default {
  name: 'MfaVerifyEmailPage',
  layout: 'auth',
  middleware: ['mfa']
}
</script>
