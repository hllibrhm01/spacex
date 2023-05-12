import type { FC } from "react"
import { toast, resolveValue, useToaster } from "react-hot-toast"
import { FiX } from "react-icons/fi"

const Notifications: FC = () => {
  const { toasts, handlers } = useToaster()
  const { startPause, endPause } = handlers

  return (
    <div className='w-screen min-h-screen h-full p-6 absolute'>
      <div
        onMouseEnter={startPause}
        onMouseLeave={endPause}
        className='toast toast-center toast-top gap-2 top-16 z-50 w-full max-w-md mx-auto -translate-x-1/2'
      >
        {toasts
          .filter(t => t.visible)
          .map(t => (
            <div key={t.id} className='alert alert-info shadow-lg' {...t.ariaProps}>
              <>
                {t.icon}
                <span className='flex-1 w-full'>{resolveValue(t.message, t)}</span>
                <button
                  className='btn btn-ghost btn-circle btn-xs'
                  onClick={() => toast.dismiss(t.id)}
                >
                  <FiX className='w-4 h-4 stroke-current' />
                </button>
              </>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Notifications
