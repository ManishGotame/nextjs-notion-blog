import { createContext, useContext, useState } from 'react'

export interface SidebarContextType {
  toggleOpen: () => void
  toggleClose: () => void
  openSidebar: boolean
  toggleSidebar: () => void
}

interface SidebarProviderType {
  children: React.ReactNode
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

const SidebarProvider: React.FC<SidebarProviderType> = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false)

  const toggleSidebar = () => {
    setOpenSidebar((prev) => !prev)
  }

  const toggleOpen = () => {
    setOpenSidebar(true)
  }

  const toggleClose = () => {
    setOpenSidebar(false)
  }

  const providerValues: SidebarContextType = {
    openSidebar: openSidebar,
    toggleSidebar: toggleSidebar,
    toggleOpen: toggleOpen,
    toggleClose: toggleClose
  }

  return (
    <SidebarContext.Provider value={providerValues}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export default SidebarProvider
