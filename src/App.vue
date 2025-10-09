<template>
  <EstruturaApp>
    <router-view />
    <Toast />
    <ConfirmDialog />
  </EstruturaApp>
</template>

<script setup lang="ts">
import EstruturaApp from './components/layout/EstruturaApp.vue'
</script>
