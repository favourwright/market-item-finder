<template>
  requests list
</template>

<script setup lang="ts">

definePageMeta({
  middleware: ['auth', 'seller'],
  requiresAuth: true,
})
</script>