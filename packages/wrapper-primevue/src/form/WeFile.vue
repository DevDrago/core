<template>
  <we-field
    :label="props.field.label"
    :message="props.field.hintText"
    :has-field-errors="hasFieldErrors"
    v-bind="props.field.wrapper"
  >
    <FileUpload
      :multiple="props.field.multiple"
      :auto="false"
      @select="onFilesSelected"
      :customUpload="true"
    >
      <template #empty>
        <p>{{ props.field.placeholder || 'Drag and drop files here to upload.' }}</p>
      </template>
    </FileUpload>
  </we-field>
</template>

<script lang="ts" setup>
import FileUpload from 'primevue/fileupload'
import type { NormalizedFileField } from '@fancy-crud/vue'
import { useFileField } from '@fancy-crud/vue'
import WeField from './WeField.vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedFileField
}>()

const { onFileChanged, hasFieldErrors } = useFileField(props)

function onFilesSelected(event: any) {
  const files = event.files
  const rawFiles = {
    target: {
      files,
    },
  } as any
  onFileChanged(rawFiles)
}
</script>
