import { ReturnObject, FwModal } from '@fancy-crud/vue'
import FwButton from './FwButton.vue'
export * from './notify'
// import WeLoadingIcon from './WeLoadingIcon.vue'

export const common = ReturnObject({
  button: FwButton,
  modal: FwModal, // Uses the default general-purpose modal from @fancy-crud/vue
})

export {
  FwButton,
  FwModal, // Re-export for convenience
  // WeLoadingIcon,
}
