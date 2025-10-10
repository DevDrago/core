import type { Notification } from '@fancy-crud/core'
import { NOTIFICATION_TYPE } from '@fancy-crud/core'
import type { ToastServiceMethods } from 'primevue/toastservice'

export function notify(defaults?: any) {
  const _defaults = defaults || {}
  let toastInstance: ToastServiceMethods | null = null

  return {
    handler: (rawNotification?: Notification) => {
      if (!rawNotification)
        return

      if (!toastInstance) {
        console.warn('PrimeVue Toast service not initialized. Make sure to call setToastInstance() first.')
        return
      }

      const severityMap: Record<string, string> = {
        [NOTIFICATION_TYPE.success]: 'success',
        [NOTIFICATION_TYPE.warning]: 'warn',
        [NOTIFICATION_TYPE.error]: 'error',
        [NOTIFICATION_TYPE.info]: 'info',
        [NOTIFICATION_TYPE.default]: 'info',
      }

      const severity = severityMap[rawNotification.type || NOTIFICATION_TYPE.default]
      
      toastInstance.add({
        severity,
        summary: rawNotification.title || '',
        detail: rawNotification.message || '',
        life: 3000,
        ..._defaults,
      })
    },
    setToastInstance: (instance: ToastServiceMethods) => {
      toastInstance = instance
    },
  }
}

export const toast = notify
