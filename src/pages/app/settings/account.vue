<template>
  <div>
    <div class="space-y-10 divide-y divide-gray-200">
      <div class="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-4">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            {{ $t('pages.user.settings.account.personal') }}
          </h2>
        </div>

        <form
          method="POST"
          class="rounded-md bg-white shadow-sm shadow-sm ring-1 ring-gray-200 md:col-span-3"
          @submit.prevent="savePersonalForm"
        >
          <div class="px-4 py-6 sm:p-8">
            <div
              class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
            >
              <FormInput
                v-model="personalForm.data.firstname"
                :name="'firstname'"
                :type="'text'"
                :label="
                  $t(
                    'forms.user.settings.account.personal.firstname'
                  ).toString()
                "
                :error="fieldError('personal', 'firstname')"
                class="sm:col-span-3"
                required
              />

              <FormInput
                v-model="personalForm.data.lastname"
                :name="'lastname'"
                :type="'text'"
                :label="
                  $t('forms.user.settings.account.personal.lastname').toString()
                "
                :error="fieldError('personal', 'lastname')"
                class="sm:col-span-3"
                required
              />

              <FormInput
                :id="'birth-date'"
                v-model="personalForm.data.birthDate"
                :name="'birthDate'"
                :type="'date'"
                :label="
                  $t(
                    'forms.user.settings.account.personal.birthdate'
                  ).toString()
                "
                :error="fieldError('personal', 'birthDate')"
                class="col-span-full"
                required
              />
            </div>
          </div>
          <div
            class="flex items-center justify-end gap-x-2 border-t border-gray-200 px-4 py-4 sm:px-8 lg:justify-start"
          >
            <CommonButton
              :label="$t('common.buttons.save').toString()"
              :type="'submit'"
              :size="4"
              :is-loading="isLoading.personal"
            />
          </div>
        </form>
      </div>

      <div class="grid grid-cols-1 gap-x-8 gap-y-4 pt-10 md:grid-cols-4">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            {{ $t('pages.user.settings.account.passwords') }}
          </h2>
        </div>

        <form
          method="POST"
          class="rounded-md bg-white shadow-sm shadow-sm ring-1 ring-gray-200 md:col-span-3"
          @submit.prevent="savePasswordForm"
        >
          <div class="px-4 py-6 sm:p-8">
            <div
              class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
            >
              <FormInput
                :id="'old-password'"
                v-model="passwordForm.data.oldPassword"
                :name="'oldPassword'"
                :type="'password'"
                :label="
                  $t(
                    'forms.user.settings.account.password.oldPassword'
                  ).toString()
                "
                :autocomplete="'current-password'"
                :error="fieldError('password', 'oldPassword')"
                class="col-span-full"
                required
              />

              <FormInput
                :id="'new-password'"
                v-model="passwordForm.data.newPassword"
                :name="'newPassword'"
                :type="'password'"
                :label="
                  $t(
                    'forms.user.settings.account.password.newPassword.label'
                  ).toString()
                "
                :autocomplete="'new-password'"
                :hint="
                  $t(
                    'forms.user.settings.account.password.newPassword.hint'
                  ).toString()
                "
                :error="fieldError('password', 'newPassword')"
                class="col-span-full"
                required
              />

              <FormInput
                :id="'new-password-confirm'"
                v-model="passwordForm.data.newPasswordConfirm"
                :name="'newPasswordConfirm'"
                :type="'password'"
                :label="
                  $t(
                    'forms.user.settings.account.password.newPasswordConfirm'
                  ).toString()
                "
                :autocomplete="'new-password'"
                :error="fieldError('password', 'newPasswordConfirm')"
                class="col-span-full"
                required
              />
            </div>
          </div>
          <div
            class="flex items-center justify-end gap-x-2 border-t border-gray-200 px-4 py-4 sm:px-8 lg:justify-start"
          >
            <CommonButton
              :label="$t('common.buttons.save').toString()"
              :type="'submit'"
              :size="4"
              :is-loading="isLoading.password"
            />
          </div>
        </form>
      </div>

      <div class="grid grid-cols-1 gap-x-8 gap-y-4 pt-10 md:grid-cols-4">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            {{ $t('pages.user.settings.account.keys') }}
          </h2>
        </div>

        <form
          method="POST"
          class="rounded-md bg-white shadow-sm shadow-sm ring-1 ring-gray-200 md:col-span-3"
          @submit.prevent="saveKeysForm"
        >
          <div class="px-4 py-6 sm:p-8">
            <div
              class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
            >
              <FormTextarea
                :id="'public-key'"
                v-model="keysForm.data.publicKey"
                :name="'publicKey'"
                :label="$t('forms.register.publicKey').toString()"
                :error="fieldError('keys', 'publicKey')"
                :rows="3"
                class="col-span-full"
                required
              />

              <FormTextarea
                :id="'secret-key'"
                v-model="keysForm.data.secretKey"
                :name="'secretKey'"
                :label="$t('forms.register.secretKey').toString()"
                :error="fieldError('keys', 'secretKey')"
                :rows="3"
                class="col-span-full"
                required
              />
            </div>
          </div>
          <div
            class="flex items-center justify-end gap-x-2 border-t border-gray-200 px-4 py-4 sm:px-8 lg:justify-start"
          >
            <CommonButton
              :label="$t('common.buttons.save').toString()"
              :type="'submit'"
              :size="4"
            />
          </div>
        </form>
      </div>

      <div class="grid grid-cols-1 gap-x-8 gap-y-4 pt-10 md:grid-cols-4">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            {{ $t('pages.user.settings.account.deleteAccount') }}
          </h2>
        </div>

        <form
          method="POST"
          class="rounded-md bg-white shadow-sm shadow-sm ring-1 ring-gray-200 md:col-span-3"
          @submit.prevent="deleteAccount"
        >
          <div class="px-4 py-6 sm:p-8">
            <div
              class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
            >
              <FormInput
                v-model="deleteAccountForm.data.password"
                :name="'password'"
                :type="'password'"
                :label="
                  $t(
                    'forms.user.settings.account.deleteAccount.password'
                  ).toString()
                "
                :error="fieldError('deleteAccount', 'password')"
                class="col-span-full"
                required
              />
            </div>
          </div>
          <div
            class="flex items-center justify-end gap-x-2 border-t border-gray-200 px-4 py-4 sm:px-8 lg:justify-start"
          >
            <CommonButton
              :label="$t('common.buttons.delete').toString()"
              :type="'submit'"
              :size="4"
              :color="'danger'"
              :is-loading="isLoading.deleteAccount"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useContext } from '@nuxtjs/composition-api'
import { AxiosResponse } from 'axios'
import { useDomainForm, useFormData } from '~/composables/forms/form'
import {
  DeleteAccountForm,
  SettingsAccountKeysForm,
  SettingsAccountPasswordForm,
  SettingsAccountPersonalForm
} from '~/types/forms/Settings'
import { useUser } from '~/composables/user'
import { useDomainLoading } from '~/composables/loading'
import { InvalidContentResponse, JsonResponse } from '~/types/http/Responses'
import { RESPONSE_CODE } from '~/enums/http/responses/ResponseCode'

const context = useContext()
const { $repositories, $toast, i18n, store } = context

const { fieldError, clearErrors, parseErrors } = useDomainForm<
  ['personal', 'password', 'keys', 'deleteAccount']
>(['personal', 'password', 'keys', 'deleteAccount'])

const { createForm } = useFormData()

const { isLoading, setIsLoading } = useDomainLoading<{
  personal: boolean
  password: boolean
  keys: boolean
  deleteAccount: boolean
}>({
  personal: false,
  password: false,
  keys: false,
  deleteAccount: false
})

const { getUser, logout } = useUser()
const user = getUser()

const personalForm = createForm<SettingsAccountPersonalForm>({
  firstname: user.value.firstname,
  lastname: user.value.lastname,
  birthDate: user.value.birthDate
})

const passwordForm = createForm<SettingsAccountPasswordForm>({
  oldPassword: null,
  newPassword: null,
  newPasswordConfirm: null
})

const keysForm = createForm<SettingsAccountKeysForm>({
  publicKey: null,
  secretKey: null
})

const deleteAccountForm = createForm<DeleteAccountForm>({
  password: null
})

async function savePersonalForm(): Promise<void> {
  setIsLoading('personal', true)

  try {
    await $repositories.userSettings.saveAccountPersonal(personalForm.data)

    clearErrors('personal')

    $toast.success({
      title: i18n.t('toasts.user.settings.account.personal.success').toString()
    })

    await store.dispatch('auth/fetchUser', context) // update user model
  } catch (e: any) {
    const response: AxiosResponse<JsonResponse> = e.response

    if (response.data.code === RESPONSE_CODE.INVALID_CONTENT) {
      parseErrors('personal', response.data as InvalidContentResponse)

      $toast.error({
        title: i18n.t('toasts.common.formErrors').toString()
      })

      return
    }

    clearErrors('personal')

    $toast.error({
      title: i18n.t('toasts.common.somethingWentWrong').toString()
    })
  } finally {
    setIsLoading('personal', false)
  }
}

async function savePasswordForm(): Promise<void> {
  setIsLoading('password', true)

  try {
    await $repositories.userSettings.saveAccountPassword(passwordForm.data)

    clearErrors('password')

    $toast.success({
      title: i18n.t('toasts.user.settings.account.password.success').toString()
    })

    passwordForm.reset()
  } catch (e: any) {
    const response: AxiosResponse<JsonResponse> = e.response

    if (response.data.code === RESPONSE_CODE.INVALID_CONTENT) {
      parseErrors('password', response.data as InvalidContentResponse)

      $toast.error({
        title: i18n.t('toasts.common.formErrors').toString()
      })

      return
    }

    clearErrors('password')

    $toast.error({
      title: i18n.t('toasts.common.somethingWentWrong').toString()
    })
  } finally {
    setIsLoading('password', false)
  }
}

async function saveKeysForm(): Promise<void> {
  setIsLoading('keys', true)

  try {
    await $repositories.userSettings.saveAccountKeys(keysForm.data)

    clearErrors('keys')

    $toast.success({
      title: i18n.t('toasts.user.settings.account.keys.success').toString()
    })

    keysForm.reset()
  } catch (e: any) {
    const response: AxiosResponse<JsonResponse> = e.response

    if (response.data.code === RESPONSE_CODE.INVALID_CONTENT) {
      parseErrors('keys', response.data as InvalidContentResponse)

      $toast.error({
        title: i18n.t('toasts.common.formErrors').toString()
      })

      return
    }

    clearErrors('keys')

    $toast.error({
      title: i18n.t('toasts.common.somethingWentWrong').toString()
    })
  } finally {
    setIsLoading('keys', false)
  }
}

async function deleteAccount(): Promise<void> {
  setIsLoading('deleteAccount', true)

  try {
    await $repositories.user.delete(deleteAccountForm.data)

    clearErrors('deleteAccount')

    $toast.success({
      title: i18n
        .t('toasts.user.settings.account.deleteAccount.success')
        .toString()
    })

    deleteAccountForm.reset()

    await logout(false, false)
  } catch (e: any) {
    const response: AxiosResponse<JsonResponse> = e.response

    if (response.data.code === RESPONSE_CODE.INVALID_CONTENT) {
      parseErrors('deleteAccount', response.data as InvalidContentResponse)

      $toast.error({
        title: i18n.t('toasts.common.formErrors').toString()
      })

      return
    }

    clearErrors('deleteAccount')

    $toast.error({
      title: i18n.t('toasts.common.somethingWentWrong').toString()
    })
  } finally {
    setIsLoading('deleteAccount', false)
  }
}
</script>

<script lang="ts">
export default {
  name: 'AppSettingsAccountPage',
  layout: 'app'
}
</script>
