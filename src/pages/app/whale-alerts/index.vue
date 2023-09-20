<template>
  <div>
    <!-- page header -->
    <div class="mb-5">
      <h2
        class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
      >
        {{ $t('pages.whaleAlerts.title') }}
      </h2>
    </div>

    <WhaleAlertsTable />
  </div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default {
  name: 'AppWhaleAlertsPage',
  layout: 'app'
}
</script>
