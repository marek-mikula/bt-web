<template>
  <div>You are logged in!</div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default {
  name: 'AppHomePage',
  layout: 'none',
  middleware: ['auth']
}
</script>
