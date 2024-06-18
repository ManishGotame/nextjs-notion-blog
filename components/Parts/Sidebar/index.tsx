import { SidebarNavigation } from './Navigation'
import { SidebarOverlay } from './Overlay'

const Sidebar = () => {
  const isOpen = false
  return (
    <nav
      className={`${
        isOpen
          ? 'absolute inset-y-0 left-0 translate-x-0 shadow-lg'
          : 'absolute -translate-x-full'
      } 3xl:w-80 z-50 flex h-full max-h-screen min-h-screen w-3/4 flex-none transform flex-col overflow-y-auto border-r border-gray-150 bg-white pb-10 transition duration-200 ease-in-out dark:border-gray-800 dark:bg-gray-900 sm:w-1/2 sm:pb-0 md:w-1/3 lg:relative lg:z-auto lg:w-56 lg:translate-x-0 lg:bg-gray-50 lg:dark:bg-gray-900 2xl:w-72`}
    >
      <div
        className={`filter-blur sticky top-0 z-10 flex flex-col justify-center px-5 py-5 dark:border-b dark:border-gray-900`}
      >
        <div className='flex items-center justify-between flex-none'>
          <h2 className='text-sm font-bold text-primary transform-gpu line-clamp-1'>
            Manish Gotame
          </h2>
        </div>
      </div>
      <SidebarNavigation />
      <SidebarOverlay />
    </nav>
  )
}

export default Sidebar
