<template>
  <div class="field" :class="{ 'p-invalid': hasFieldErrors }">
    <label v-if="label" :for="attrs.id" class="block mb-2">{{ label }}</label>
    <slot />
    <small v-if="hasFieldErrors" class="p-error block mt-1">{{ message }}</small>
    <small v-else-if="message" class="block mt-1 text-gray-600">{{ message }}</small>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label?: string
  message?: string
  hasFieldErrors?: boolean
}>()

const attrs = useAttrs()
</script>

<style lang="sass">
.hidden-hint
  opacity: 0
</style>
