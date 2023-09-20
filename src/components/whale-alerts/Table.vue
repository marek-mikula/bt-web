<template>
  <div>
    <CommonTable :data="data" :config="config" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TableConfig } from '~/types/common/Table'

const data = ref([
  {
    id: 34,
    firstname: 'Marek',
    lastname: 'Mikula',
    age: 24,
    address: 'V Horkác 1387, Praha 4'
  },
  {
    id: 39,
    firstname: 'Lukáš',
    lastname: 'Trocký',
    age: 24,
    address: 'V Horkác 1387, Praha 4'
  }
])

const config = ref<TableConfig>({
  unique: 'id',
  emptyLabel: 'No data found.',
  columns: [
    {
      key: 'id',
      attribute: 'id',
      label: 'id',
      headColClass:
        'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6',
      bodyColClass:
        'whitespace-nowrap text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'
    },
    {
      key: 'firstname',
      attribute: 'firstname',
      label: 'firstname'
    },
    {
      key: 'lastname',
      attribute: 'lastname',
      label: 'lastname'
    },
    {
      key: 'address',
      attribute: 'address',
      label: 'address'
    },
    {
      key: 'age',
      attribute: 'age',
      label: 'age',
      headColClass:
        'py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6',
      bodyColClass:
        'whitespace-nowrap text-right py-4 pl-3 pr-4 text-sm font-medium text-gray-900 sm:pr-6'
    }
  ]
})
</script>

<script lang="ts">
export default {
  name: 'WhaleAlertsTable'
}
</script>
