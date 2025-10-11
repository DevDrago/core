import { ReturnObject } from '@fancy-crud/vue'
import FwButton from './FwButton.vue'
import FwModal from './FwModal.vue'
export * from './notify'
// import WeLoadingIcon from './WeLoadingIcon.vue'

export const common = ReturnObject({
  button: FwButton,
  modal: FwModal,
})

export {
  FwButton,
  FwModal,
  // WeLoadingIcon,
}
