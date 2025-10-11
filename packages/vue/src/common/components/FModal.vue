<script lang="ts">
import { components } from '@fancy-crud/core'

export default defineComponent({
  setup(props, { attrs, slots }) {
    return () => h(components.modal, { ...props, ...attrs }, slots)
  },
})
</script>
