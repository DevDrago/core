<script lang="ts">
import Select from 'primevue/select'
import type { NormalizedSelectField } from '@fancy-crud/vue'
import type { PropType } from 'vue'
import { useSelectField } from '@fancy-crud/vue'
import FwField from './FwField.vue'

export default defineComponent({
  props: {
    formId: {
      type: Symbol,
      required: true,
    },
    field: {
      type: Object as PropType<NormalizedSelectField>,
      required: true,
    },
  },

  setup(props, { attrs: vAttrs }) {
    const { vmodel, hintText, options, attrs, hasFieldErrors } = useSelectField(props)

    const selectOptions = computed(() => {
      return options.value.map(([label, value]: any) => ({
        label: String(label),
        value,
      }))
    })

    return () =>
      h(FwField, { 
        ...props.field.wrapper, 
        label: props.field.label, 
        message: hintText.value, 
        hasFieldErrors: hasFieldErrors.value 
      }, {
        default: () => h(Select, { 
          ...vAttrs, 
          ...attrs.value, 
          ...vmodel.value as any,
          options: selectOptions.value,
          optionLabel: 'label',
          optionValue: 'value',
          class: ['w-full', { 'p-invalid': hasFieldErrors.value }],
        }),
      })
  },
})
</script>

