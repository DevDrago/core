<script lang="ts">
import { components } from '@fancy-crud/core'
import { useModalStack, type ModalStackPosition } from '../composables/useModalStack'

export default defineComponent({
  props: {
    modalId: {
      type: String,
      default: null,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    stackPosition: {
      type: String as PropType<ModalStackPosition>,
      default: 'right',
      validator: (value: string) => ['left', 'center', 'right'].includes(value),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots }) {
    // Stack management (only if modalId provided)
    const modalStack = props.modalId ? useModalStack() : null

    // Register modal if modalId provided
    if (props.modalId) {
      onMounted(() => {
        modalStack?.registerModal(props.modalId!, {
          position: props.stackPosition,
        })
      })
      onUnmounted(() => modalStack?.unregisterModal(props.modalId!))

      // Sync v-model with stack
      watch(() => props.modelValue, (isOpen) => {
        if (props.modalId) {
          modalStack?.syncWithVModel(props.modalId, isOpen)
        }
      })
    }

    // Stack-aware reactive state
    const stackPosition = computed(() => modalStack?.getModalPosition(props.modalId!) || null)
    
    // Animation state management (matching ModalContainer.vue)
    const showOpen = ref(false)

    // Watch for modal opening/position changes to trigger proper animation sequence
    watch([() => props.modelValue, stackPosition], async ([newOpen, newPos], [oldOpen, oldPos]) => {
      if (!props.modalId) return // Not in stack, skip animation logic
      
      if (newOpen && !oldOpen) {
        // Modal is opening
        showOpen.value = false
        
        // If it's a subsequent modal (coming from left/right), set initial position first
        if (newPos === 'active-left' || newPos === 'active-right') {
          // Force browser to render initial position before adding open class
          await nextTick()
        }
        
        // Add open class after small delay for smooth animation
        setTimeout(() => {
          showOpen.value = true
        }, 10)
      } else if (!newOpen && oldOpen) {
        // Modal is closing
        showOpen.value = false
      } else if (newOpen && oldOpen && newPos !== oldPos) {
        // Modal is already open but position changed (shifted in stack)
        // Position changes should be immediate, no delay
        showOpen.value = true
      }
    }, { immediate: true })

    // Extract shift level from position string (e.g., "shifted-3" -> 3)
    const shiftLevel = computed(() => {
      const pos = stackPosition.value
      if (pos && typeof pos === 'string') {
        if (pos.startsWith('shifted-left-')) {
          return parseInt(pos.replace('shifted-left-', ''))
        }
        if (pos.startsWith('shifted-')) {
          return parseInt(pos.replace('shifted-', ''))
        }
      }
      return null
    })

    // Calculate dynamic transform for shifted modals (matching ModalContainer.vue)
    const dynamicTransform = computed(() => {
      const level = shiftLevel.value
      if (level === null) return null
      
      const pos = stackPosition.value
      const isLeftStack = pos && typeof pos === 'string' && pos.startsWith('shifted-left-')
      
      // Calculate dynamic positioning based on shift level
      // Pattern: X increases by 5% each level, Y increases gradually
      const xOffset = 70 + (level * 5) // 75%, 80%, 85%, 90%, 95%, 100%, 105%...
      let yOffset = 0
      
      if (level >= 2) {
        yOffset = 2
      }
      if (level >= 3) {
        yOffset = 4
      }
      if (level >= 5) {
        yOffset = 4 + ((level - 4) * 1) // Gradually increase for deeper levels
      }
      
      // Apply direction based on stack position
      if (isLeftStack) {
        return `translate(-${xOffset}%, ${yOffset}%)`
      } else {
        return `translate(${xOffset}%, ${yOffset}%)`
      }
    })

    // CSS classes based on position (matching ModalContainer.vue)
    const positionClasses = computed(() => {
      if (!props.modalId) return [] // Not in stack
      
      const pos = stackPosition.value
      const stackPos = props.stackPosition
      const classes = []
      
      // Stack position class
      classes.push(`fancy-modal-stack-${stackPos}`)
      
      // Position-based classes
      if (props.modelValue) {
        if (pos === 'active-first' || pos === 'active-left' || pos === 'active-right') {
          // Active modals get 'open' class (with delay via showOpen)
          if (showOpen.value) {
            classes.push('fancy-modal-open')
          }
          
          // Position-specific classes
          if (pos === 'active-left') {
            classes.push('fancy-modal-from-left')
          } else if (pos === 'active-right') {
            classes.push('fancy-modal-from-right')
          }
        } else if (shiftLevel.value !== null) {
          // Background stacked modals
          classes.push('fancy-modal-shifted')
        }
      } else {
        // Not open
        classes.push('fancy-modal-closed')
      }
      
      return classes
    })

    // Calculate modal inline styles
    const modalStyles = computed(() => {
      if (!props.modalId) return {}
      
      const styles: any = {}
      
      const zIndex = modalStack?.getModalZIndex(props.modalId!)
      if (zIndex) {
        styles.zIndex = zIndex
      }

      // Apply dynamic transform for shifted modals
      if (shiftLevel.value !== null && dynamicTransform.value) {
        styles.transform = dynamicTransform.value
      }

      return styles
    })

    // Computed props to pass to wrapper
    const wrapperProps = computed(() => {
      const base = {
        ...props,
        ...attrs,
      }

      // Add stack-specific props if in stack
      if (props.modalId && modalStack) {
        return {
          ...base,
          'data-modal-id': props.modalId,
          'data-modal-position': stackPosition.value,
          'data-modal-zindex': modalStack.getModalZIndex(props.modalId),
          'data-modal-stack-position': props.stackPosition,
          'data-modal-in-stack': true,
          'data-fancy-modal-classes': positionClasses.value.join(' '),
          'data-fancy-modal-styles': modalStyles.value,
        }
      }

      return base
    })

    return () => h(components.modal, wrapperProps.value, slots)
  },
})
</script>
