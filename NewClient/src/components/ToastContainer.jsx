import { useToast } from '../context/ToastContext'
import Toast from './Toast'

const ToastContainer = () => {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 flex-col gap-2 px-4">
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}

export default ToastContainer
