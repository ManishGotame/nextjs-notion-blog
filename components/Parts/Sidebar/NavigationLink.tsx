import * as React from 'react'
import Link from 'next/link'

interface NavigationLinkProps {
  link: {
    href: string
    label: string
    icon: React.ComponentType
    trailingAccessory?: React.ComponentType | null
    trailingAction?: React.ComponentType | null
    isActive?: boolean | null
    isExternal?: boolean | null
  }
}

export function NavigationLink({
  link: {
    href,
    label,
    icon: Icon,
    trailingAccessory: Accessory,
    trailingAction: Action,
    isActive = false,
    isExternal = false
  }
}: NavigationLinkProps) {
  return (
    <li className='flex items-stretch space-x-1'>
      <Link href={href} passHref>
        <a
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className={`flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium ${
            isActive
              ? 'bg-black text-white dark:bg-gray-700 dark:text-white'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-200'
          }`}
        >
          <span className='flex items-center justify-center w-4'>
            <Icon />
          </span>
          <span className='flex-1'>{label}</span>
          {Accessory && (
            <span className='flex items-center justify-center w-4 text-black text-opacity-40 dark:text-white'>
              <Accessory />
            </span>
          )}
        </a>
      </Link>
      {Action && <Action />}
    </li>
  )
}
