<template>
  <div class="flex min-h-screen">
    <div class="relative hidden w-0 flex-1 lg:block">
      <nuxt-img
        class="absolute inset-0 h-full w-full object-cover"
        src="/img/auth-bg.png"
        alt="Cryptocurrency abstract background"
      />
    </div>
    <div
      class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2 class="mt-6 text-4xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p class="mt-2 text-gray-600">
            Or
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
              >create a new account</a
            >
          </p>
        </div>

        <div class="mt-8">
          <div class="mt-6">
            <form action="#" method="POST" class="space-y-6" @submit="login">
              <FormInput
                v-model="form.email"
                :name="'email'"
                :type="'email'"
                :label="'Email Address'"
                :autocomplete="'email'"
                required
              />

              <FormInput
                v-model="form.password"
                :name="'password'"
                :type="'password'"
                :label="'Password'"
                :autocomplete="'current-password'"
                required
              />

              <div class="flex items-center justify-between">
                <FormCheckbox
                  v-model="form.rememberMe"
                  :name="'remember-me'"
                  :label="'Remember me'"
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
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from '@nuxtjs/composition-api'

interface FormData {
  email: string | null
  password: string | null
  rememberMe: boolean
}

const form: FormData = reactive({
  email: null,
  password: null,
  rememberMe: false
})

async function login(): Promise<void> {
  // try {
  //   const response = await $auth.loginWith('laravelJWT', {
  //     data: form
  //   })
  //
  //   console.log(response)
  // } catch (e: any) {
  //   console.log(e)
  // }
}
</script>

<script lang="ts">
export default {
  name: 'LoginPage',
  layout: 'auth'
}
</script>
