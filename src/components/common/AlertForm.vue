<template>
  <CommonAlert
    v-if="errors.length > 0"
    :type="'danger'"
    :label="$t('common.form.otherErrors').toString()"
  >
    <ul class="space-y-2">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </CommonAlert>
</template>

<script setup lang="ts">
defineProps<{
  errors: string[]
}>()
</script>

<script lang="ts">
export default {
  name: 'CommonAlertForm'
}
</script>
