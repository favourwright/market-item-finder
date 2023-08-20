<template>
  Create new request
</template>

<script setup lang="ts">

definePageMeta({
  middleware: ['auth', 'buyer'],
  requiresAuth: true,
})
</script>