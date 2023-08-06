<template>
  <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
    <div class="mx-auto max-w-3xl">
      <div
        class="mb-4 px-4 sm:mb-6 sm:px-0 md:flex md:items-center md:justify-between lg:mb-8"
      >
        <div class="min-w-0 flex-1">
          <h2
            class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
          >
            {{ $t('pages.register.title') }}
          </h2>
        </div>
        <div class="mt-4 flex md:ml-4 md:mt-0">
          <NuxtLink
            to="/"
            class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            {{ $t('common.buttons.backToLogin') }}
          </NuxtLink>
        </div>
      </div>

      <form
        class="space-y-10 divide-y divide-gray-900/10"
        method="POST"
        @submit.prevent="register"
      >
        <div class="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-3">
          <div class="px-4 sm:px-0">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              {{ $t('pages.register.sections.personal') }}
            </h2>
          </div>

          <div
            class="rounded-md bg-white shadow-sm shadow-sm ring-1 ring-gray-900/5 md:col-span-2"
          >
            <div class="px-4 py-6 sm:p-8">
              <div
                class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
              >
                <FormInput
                  v-model="form.firstname"
                  :name="'firstname'"
                  :type="'text'"
                  :label="$t('forms.register.firstname').toString()"
                  :autocomplete="'given-name'"
                  :error="fieldError('firstname')"
                  class="sm:col-span-3"
                  required
                />

                <FormInput
                  v-model="form.lastname"
                  :name="'lastname'"
                  :type="'text'"
                  :label="$t('forms.register.lastname').toString()"
                  :autocomplete="'family-name'"
                  :error="fieldError('lastname')"
                  class="sm:col-span-3"
                  required
                />

                <FormInput
                  v-model="form.email"
                  :name="'email'"
                  :type="'email'"
                  :label="$t('forms.register.email').toString()"
                  :autocomplete="'email'"
                  :error="fieldError('email')"
                  class="col-span-full"
                  required
                />

                <FormInput
                  :id="'birth-date'"
                  v-model="form.birthDate"
                  :name="'birthDate'"
                  :type="'date'"
                  :label="$t('forms.register.birthdate').toString()"
                  :autocomplete="'bday'"
                  :error="fieldError('birthDate')"
                  class="col-span-full"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-x-8 gap-y-4 pt-10 md:grid-cols-3">
          <div class="px-4 sm:px-0">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              {{ $t('pages.register.sections.passwords') }}
            </h2>
          </div>

          <div
            class="rounded-md bg-white shadow-sm shadow-sm ring-1 ring-gray-900/5 md:col-span-2"
          >
            <div class="px-4 py-6 sm:p-8">
              <div
                class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
              >
                <FormInput
                  v-model="form.password"
                  :name="'password'"
                  :type="'password'"
                  :label="$t('forms.register.password.label').toString()"
                  :autocomplete="'new-password'"
                  :hint="$t('forms.register.password.hint').toString()"
                  :error="fieldError('password')"
                  class="col-span-full"
                  show-password-meter
                  required
                />

                <FormInput
                  :id="'password-confirm'"
                  v-model="form.passwordConfirm"
                  :name="'passwordConfirm'"
                  :type="'password'"
                  :label="$t('forms.register.passwordConfirm').toString()"
                  :autocomplete="'new-password'"
                  :error="fieldError('passwordConfirm')"
                  class="col-span-full"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-x-8 gap-y-4 pt-10 md:grid-cols-3">
          <div class="px-4 sm:px-0">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              {{ $t('pages.register.sections.keys.label') }}
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
              {{ $t('pages.register.sections.keys.hint') }}
            </p>
          </div>

          <div
            class="rounded-md bg-white shadow-sm shadow-sm ring-1 ring-gray-900/5 md:col-span-2"
          >
            <div class="px-4 py-6 sm:p-8">
              <div
                class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
              >
                <FormTextarea
                  :id="'public-key'"
                  v-model="form.publicKey"
                  :name="'publicKey'"
                  :label="$t('forms.register.publicKey').toString()"
                  :placeholder="'mpX28HOXXSzKVKAc4zI6xHfC1Wp9rTTInPgxTdphmsDNTL3rVouMpJnI8VfdXy0x'"
                  :error="fieldError('publicKey')"
                  class="col-span-full"
                  required
                />

                <FormTextarea
                  :id="'secret-key'"
                  v-model="form.secretKey"
                  :name="'secretKey'"
                  :label="$t('forms.register.secretKey').toString()"
                  :placeholder="'oB8yyGiCwyL3qRbEfI0hy7l9e8m1mnJtbLMEEkH5LK8K1M18XbKqD5YfKCmUiNIw'"
                  :error="fieldError('secretKey')"
                  class="col-span-full"
                  required
                />
              </div>
            </div>
            <div
              class="flex items-center justify-end gap-x-2 border-t border-gray-900/10 px-4 py-4 sm:px-8"
            >
              <CommonButton
                :label="$t('forms.register.submit').toString()"
                :type="'submit'"
                :size="4"
                :is-loading="isLoading"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, useContext, useRouter } from '@nuxtjs/composition-api'
import { AxiosResponse } from 'axios'
import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'
import { useForm } from '~/composables/forms/form'
import { useLoading } from '~/composables/loading'
import { RegisterForm } from '~/types/forms/Auth'
import { InvalidContentResponse, JsonResponse } from '~/types/http/Responses'

const { $repositories, $toast, i18n } = useContext()
const { clearErrors, fieldError, parseErrors } = useForm()
const { isLoading, setIsLoading } = useLoading()
const router = useRouter()

const form: RegisterForm = reactive<RegisterForm>({
  firstname: null,
  lastname: null,
  email: null,
  birthDate: null,
  password: null,
  passwordConfirm: null,
  publicKey: null,
  secretKey: null
})

async function register(): Promise<void> {
  setIsLoading(true)

  try {
    const response = await $repositories.auth.register(form)

    clearErrors()

    $toast.info({
      title: i18n.t('toasts.register.verifyEmail').toString()
    })

    await router.push({
      path: '/mfa/verify-email',
      query: { token: response.data.data.token.token }
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
  name: 'RegisterPage',
  layout: 'none'
}
</script>
