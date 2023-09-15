<template>
  <div>
    <!-- page header -->
    <div class="mb-5">
      <h2
        class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
      >
        {{ $t('pages.wallet.title') }}
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default {
  name: 'AppWalletPage',
  layout: 'app'
}
</script>
