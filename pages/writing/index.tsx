import { resolveNotionPage } from 'lib/resolve-notion-page'

import { FigmaIcon } from '@/components/Icon'
import { NotionPage } from '@/components/NotionPage'
import { NavigationLink } from '@/components/Parts/Sidebar/NavigationLink'
import { domain } from '@/lib/config'
import { getTitles } from '@/lib/get-titles'

export const getStaticProps = async () => {
  try {
    const props = await resolveNotionPage(domain)

    return { props, revalidate: 10 }
  } catch (err) {
    console.error('page error', domain, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export default function WritingPage(props) {
  const { site, recordMap, error, pageId } = props
  const isActive = false
  const articleTitles = getTitles(recordMap)

  console.log(articleTitles, site)

  if (error) return error

  return (
    <div className='h-[100%] border-r border-gray-150 bg-white pb-10 transition duration-200 ease-in-out dark:border-gray-800 dark:bg-gray-900 sm:w-1/2 sm:pb-0 md:w-1/3 lg:relative lg:z-auto lg:w-[400px] lg:translate-x-0 lg:bg-gray-50 lg:dark:bg-gray-900'>
      <div className='p-5 border-b border-gray-800 text-sm font-bold text-primary transform-gpu line-clamp-1'>
        Writing
      </div>
      <div className='p-5'>
        {articleTitles
          .slice(1, articleTitles.length)
          .reverse()
          .map((each, index) => {
            const item = {
              href: `/writing/${each.id}`,
              label: each.title,
              icon: FigmaIcon
            }
            return (
              <>
                {/* <NavigationLink key={index} link={item} /> */}
                <div
                  className={`cursor-pointer flex flex-1 items-center space-x-3 rounded-md px-2 py-3 text-sm font-medium ${
                    isActive
                      ? 'bg-black text-white dark:bg-gray-700 dark:text-white'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  <span className='flex-1'>{each.title}</span>
                </div>
              </>
            )
          })}
      </div>
    </div>
  )
}
