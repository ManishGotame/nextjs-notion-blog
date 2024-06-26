import { useState } from 'react'

export function SidebarOverlay() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`fixed inset-0 z-10 w-full bg-black bg-opacity-10 transition duration-200 ease-in-out dark:bg-opacity-50 ${
        isOpen
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
      onClick={() => setIsOpen(false)}
    />
  )
}
