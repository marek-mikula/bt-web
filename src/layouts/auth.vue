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
        class="absolute left-4 bottom-4 inline-flex cursor-pointer items-center rounded-md text-sm font-medium opacity-80 hover:text-gray-800"
      >
        {{ $t('pages.auth.imageByMidJourney') }}
      </a>
    </div>
    <div
      class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <Nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AuthLayout'
})
</script>
