import { toast } from 'sonner'

export class NotificationService {
  success(message: string) {
    toast.success(message)
  }

  error(message: string) {
    toast.error(message)
  }

  warning(message: string) {
    toast.warning(message)
  }

  info(message: string) {
    toast.info(message)
  }
}
