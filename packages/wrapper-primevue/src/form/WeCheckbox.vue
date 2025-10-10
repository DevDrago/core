<template>
  <we-field v-bind="props.field.wrapper" :label="props.field.label" :message="hintText" :has-field-errors="hasFieldErrors">
    <div class="flex flex-col gap-2" v-if="props.field.multiple">
      <div v-for="([label, value], _index) in computedOptions" :key="_index" class="flex items-center">
        <Checkbox v-model="modelValue" :inputId="`checkbox-${_index}`" :value="value" />
        <label :for="`checkbox-${_index}`" class="ml-2">{{ getLabel(label) }}</label>
      </div>
    </div>
    <div :class="inRowDisplay" v-else>
      <div v-for="([label, value], _index) in computedOptions" :key="_index" class="flex items-center">
        <Checkbox v-model="modelValue" :inputId="`checkbox-${_index}`" :binary="true" :trueValue="value" :falseValue="null" />
        <label :for="`checkbox-${_index}`" class="ml-2">{{ getLabel(label) }}</label>
      </div>
    </div>
  </we-field>
</template>

<script lang="ts" setup>
import Checkbox from 'primevue/checkbox'
import type { NormalizedCheckboxField } from '@fancy-crud/vue'
import { useCheckboxField } from '@fancy-crud/vue'

import WeField from './WeField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedCheckboxField
}>()

const { modelValue, hintText, inRowDisplay, options, hasFieldErrors } = useCheckboxField<any>(props)

const computedOptions = computed(() => options.value as any[][])

function getLabel(label: unknown): string {
  return String(label)
}
</script>
