<script setup lang="ts">
const props = withDefaults(defineProps<{
  show: boolean
  width?: number | string     // ex.: 560 ou "560px" (default abaixo)
  minHeight?: number | string // opcional
  padding?: number            // em px (opcional)
}>(), {
  width: 560,        // ajuste esse default se quiser (ex: 345)
  padding: 24
})

const emit = defineEmits(['close'])

const toPx = (v?: number | string) =>
  typeof v === 'number' ? `${v}px` : v
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-[2000] flex items-center justify-center">
    <!-- fundo blur -->
    <div class="absolute inset-0 bg-black/35 backdrop-blur-sm" @click="emit('close')"></div>

    <!-- conteúdo -->
    <div
      class="relative z-10 rounded-[24px] bg-white/90 shadow-xl pointer-events-auto"
      :style="{
        width: toPx(width),
        minHeight: toPx(minHeight),
        padding: toPx(padding)
      }"
      @click.stop
    >
      <slot />
    </div>
  </div>
</template>
