import { cn } from '@/utils/cn'

export default function Modal({ open, onClose, children, className }: any) {
  return (
    <div
      onClick={onClose}
      className={cn(
        'fixed inset-0 z-10 flex w-full items-start justify-center overflow-hidden bg-black/40 pt-40 backdrop-blur-sm transition-opacity duration-300',
        open ? 'visible opacity-100' : 'invisible opacity-0',
      )}>
      <div
        onClick={e => {
          e.stopPropagation()
          onClose
        }}
        className={cn(
          'bg-cq-background transform rounded-xl shadow transition-transform duration-300',
          open ? 'scale-100 opacity-100' : 'scale-125 opacity-0',
          className,
        )}>
        {children}
      </div>
    </div>
  )
}
