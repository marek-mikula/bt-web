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
            Create new account
          </h2>
        </div>
        <div class="mt-4 flex md:ml-4 md:mt-0">
          <NuxtLink
            to="/"
            class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Back to login
          </NuxtLink>
        </div>
      </div>

      <form
        class="space-y-10 divide-y divide-gray-900/10"
        method="POST"
        @submit="register"
      >
        <div class="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-3">
          <div class="px-4 sm:px-0">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              Personal Information
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
                  :id="'first-name'"
                  :name="'firstName'"
                  :type="'text'"
                  :label="'First name'"
                  :autocomplete="'given-name'"
                  class="sm:col-span-3"
                  required
                />

                <FormInput
                  :id="'last-name'"
                  :name="'lastName'"
                  :type="'text'"
                  :label="'Last name'"
                  :autocomplete="'family-name'"
                  class="sm:col-span-3"
                  required
                />

                <FormInput
                  :name="'email'"
                  :type="'email'"
                  :label="'Email address'"
                  :autocomplete="'email'"
                  class="col-span-full"
                  required
                />

                <FormInput
                  :id="'birth-date'"
                  :name="'birthDate'"
                  :type="'date'"
                  :label="'Birth date'"
                  :autocomplete="'bday'"
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
              Keys
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
              Paste your <strong>Binance API</strong> keys here. They will be
              encrypted and kept in safety. We will use the to communicate with
              Binance API.
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
                  :name="'publicKey'"
                  :label="'Public key'"
                  :placeholder="'mpX28HOXXSzKVKAc4zI6xHfC1Wp9rTTInPgxTdphmsDNTL3rVouMpJnI8VfdXy0x'"
                  class="col-span-full"
                  required
                />

                <FormTextarea
                  :id="'secret-key'"
                  :name="'secretKey'"
                  :label="'Secret key'"
                  :placeholder="'oB8yyGiCwyL3qRbEfI0hy7l9e8m1mnJtbLMEEkH5LK8K1M18XbKqD5YfKCmUiNIw'"
                  class="col-span-full"
                  required
                />
              </div>
            </div>
            <div
              class="flex items-center justify-end gap-x-2 border-t border-gray-900/10 px-4 py-4 sm:px-8"
            >
              <CommonButton :type="'submit'" :size="4"> Register </CommonButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
function register() {}
</script>

<script lang="ts">
export default {
  name: 'RegisterPage',
  layout: 'auth'
}
</script>
