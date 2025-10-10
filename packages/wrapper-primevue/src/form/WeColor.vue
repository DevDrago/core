<template>
  <we-field v-bind="computedAttrs" :label="props.field.label" :message="hintText" :has-field-errors="hasFieldErrors">
    <ColorPicker v-bind="props.field" v-model="modelValue" :class="{ 'p-invalid': hasFieldErrors }" />
  </we-field>
</template>

<script lang="ts" setup>
import ColorPicker from 'primevue/colorpicker'
import type { NormalizedTextField } from '@fancy-crud/vue'
import { useTextField } from '@fancy-crud/vue'
import WeField from './WeField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedTextField
}>()

const attrs = useAttrs()

const { hintText, modelValue, hasFieldErrors } = useTextField<any>(props)

const computedAttrs = computed(() => {
  return {
    ...attrs,
    ...props.field.wrapper,
  }
})
</script>

