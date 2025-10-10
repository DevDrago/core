<template>
  <we-field v-bind="props.field.wrapper" :label="props.field.label" :message="hintText" :has-field-errors="hasFieldErrors">
    <div class="flex flex-col gap-2">
      <div v-for="([label, value], _index) in computedOptions" :key="_index" class="flex items-center">
        <RadioButton v-model="modelValue" :inputId="`radio-${_index}`" :value="value" />
        <label :for="`radio-${_index}`" class="ml-2">{{ getLabel(label) }}</label>
      </div>
    </div>
  </we-field>
</template>

<script lang="ts" setup>
import RadioButton from 'primevue/radiobutton'
import { useRadioField } from '@fancy-crud/vue'
import type { NormalizedRadioField } from '@fancy-crud/vue'
import WeField from './WeField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedRadioField
}>()

const { modelValue, hintText, options, hasFieldErrors } = useRadioField(props)

const computedOptions = computed(() => options.value as any[][])

function getLabel(label: unknown): string {
  return String(label)
}
</script>
