<template>
  <div class="flex min-h-screen">
    <div class="relative hidden w-0 flex-1 lg:block">
      <nuxt-img
        class="absolute inset-0 h-full w-full object-cover"
        src="/img/auth-bg.png"
        alt="Cryptocurrency abstract background"
      />

      <a
        href="https://www.midjourney.com/"
        target="_blank"
        class="absolute left-4 bottom-4 inline-flex cursor-pointer items-center rounded-md bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-800 opacity-80 hover:bg-indigo-200"
      >
        Image by Midjourney
      </a>
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
                  :id="'remember-me'"
                  v-model="form.rememberMe"
                  :name="'rememberMe'"
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
                <CommonButton
                  :label="'Sign in'"
                  :type="'submit'"
                  :size="4"
                  block
                />
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
import LoginForm from '~/types/forms/Auth/LoginForm'

const form: LoginForm = reactive({
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
