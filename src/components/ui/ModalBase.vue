<script setup lang="ts">
withDefaults(defineProps<{
  show:boolean; width?:number|string; minHeight?:number|string; padding?:number;
}>(),{ width:420, padding:24 })
const emit = defineEmits(['close'])
const toPx=(v?:number|string)=> typeof v==='number'?`${v}px`:v
</script>

<template>
  <teleport to="body">
    <div v-if="show" class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style="z-index:2000;">
      <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="backdrop-filter:blur(4px)" @click="emit('close')"></div>
      <div class="position-relative bg-white rounded-4 shadow" :style="{width:toPx(width),minHeight:toPx(minHeight),padding:toPx(padding),borderRadius:'24px',maxWidth:'95vw',maxHeight:'90vh',overflow:'auto'}" @click.stop>
        <slot/>
      </div>
    </div>
  </teleport>
</template>
