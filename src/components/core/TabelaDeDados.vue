<template>
  <DataTable :value="valor" :loading="carregando" :paginator="paginador" :rows="linhas">
    <Column
      v-for="col in colunas"
      :key="col.campo || col.tipo"
      :field="col.campo"
      :header="col.titulo"
    >
      <template v-if="col.tipo === 'status'" #body="{ data }">
        <Tag :value="data[col.campo]" severity="success" />
      </template>
      <template v-else-if="col.tipo === 'pendentesAcoes'" #body="{ data }">
        <div class="botoes">
          <Button size="small" label="Aprovar" @click="$emit('aprovar', data)" />
          <Button size="small" label="Rejeitar" outlined @click="$emit('rejeitar', data)" />
        </div>
      </template>
      <template v-else #body="{ data }">
        {{ data[col.campo] }}
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    valor: any[]
    carregando?: boolean
    colunas: Array<any>
    paginador?: boolean
    linhas?: number
  }>(),
  { carregando: false, paginador: false, linhas: 10 },
)
defineEmits(['aprovar', 'rejeitar'])
</script>

<style scoped>
.botoes {
  display: flex;
  gap: 0.5rem;
}
</style>
