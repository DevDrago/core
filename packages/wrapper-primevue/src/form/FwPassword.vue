<template>
  <fw-field v-bind="computedAttrs" :label="props.field.label" :message="hintText" :has-field-errors="hasFieldErrors">
    <Password v-bind="props.field" v-model="modelValue" :class="{ 'p-invalid': hasFieldErrors }" class="w-full" :inputClass="'w-full'" :feedback="false" toggleMask />
  </fw-field>
</template>

<script lang="ts" setup>
import Password from 'primevue/password'
import type { NormalizedTextField } from '@fancy-crud/vue'
import { useTextField } from '@fancy-crud/vue'
import FwField from './FwField.vue'

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

