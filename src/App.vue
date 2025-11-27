<template>
  <EstruturaApp v-if="!isAuthRoute">
    <router-view />
    <Toast />
    <ConfirmDialog />
  </EstruturaApp>
  <div v-else>
    <router-view />
    <Toast />
    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import EstruturaApp from './components/layout/EstruturaApp.vue'

const route = useRoute()
const isAuthRoute = computed(() => route.path === '/signin')
</script>
