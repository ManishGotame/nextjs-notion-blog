import { useRouter } from 'next/router'

import {
  AMAIcon,
  BookmarksIcon,
  CampsiteIcon,
  ExternalLinkIcon,
  GitHubIcon,
  HomeIcon,
  StackIcon,
  TwitterIcon,
  WritingIcon
} from '@/components/Icon'

import { NavigationLink } from './NavigationLink'

export function SidebarNavigation() {
  const router = useRouter()
  const sections = [
    {
      label: null,
      items: [
        {
          href: '/',
          label: 'Home',
          icon: HomeIcon,
          trailingAccessory: null,
          isActive: router.asPath === '/',
          trailingAction: null,
          isExternal: false
        },

        {
          href: '/writing',
          label: 'Writing',
          icon: WritingIcon,
          trailingAccessory: null,
          isActive: router.asPath.indexOf('/writing') >= 0,
          trailingAction: null,
          isExternal: false
        },

        {
          href: '/activity',
          label: 'Activity Heatmap',
          icon: StackIcon,
          trailingAccessory: null,
          isActive: router.asPath.indexOf('/activity') >= 0,
          trailingAction: null,
          isExternal: false
        }
      ]
    },
    {
      label: 'Me',
      items: [
        {
          href: '/bookmarks',
          label: 'Bookmarks',
          icon: BookmarksIcon,
          trailingAccessory: null,
          isActive: router.asPath.indexOf('/bookmarks') >= 0,
          isExternal: false
        },

        {
          href: '/ama',
          label: 'AMA',
          icon: AMAIcon,
          trailingAccessory: null,
          isActive:
            router.asPath.indexOf('/ama') >= 0 &&
            !router.asPath.startsWith('/ama/pending'),
          trailingAction: null,
          isExternal: false
        }
      ]
    },
    {
      label: 'Projects',
      items: [
        {
          href: 'https://openpastpaper.com',
          label: 'Open Past Paper',
          icon: CampsiteIcon,
          trailingAccessory: ExternalLinkIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true
        }
      ]
    },
    {
      label: 'Online',
      items: [
        {
          href: 'https://twitter.com/manigotame',
          label: 'Twitter',
          icon: TwitterIcon,
          trailingAccessory: ExternalLinkIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true
        },

        {
          href: 'https://github.com/manishgotame',
          label: 'GitHub',
          icon: GitHubIcon,
          trailingAccessory: ExternalLinkIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true
        }
      ]
    }
  ]

  return (
    <div className='flex-1 px-3 py-3 space-y-1'>
      {sections.map((section, i) => {
        return (
          <ul key={i} className='space-y-1'>
            {section.label && (
              <h4
                key={i}
                className='px-2 pt-5 pb-2 text-xs font-semibold text-gray-1000 text-opacity-40 dark:text-white'
              >
                {section.label}
              </h4>
            )}
            {section.items.map((item, j) => (
              <NavigationLink key={j} link={item} />
            ))}
          </ul>
        )
      })}
    </div>
  )
}
