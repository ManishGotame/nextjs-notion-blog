import * as React from 'react'

import { resolveNotionPage } from 'lib/resolve-notion-page'

import { NotionPage } from '@/components/NotionPage'
import { domain } from '@/lib/config'

export const getStaticProps = async () => {
  try {
    const props = await resolveNotionPage(
      domain,
      'Home-Page-bee83c4bea444e2794fa7fafa6b578f7' // temp
    )

    return { props, revalidate: 10 }
  } catch (err) {
    console.error('page error', domain, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export default function NotionDomainPage(props) {
  return <NotionPage {...props} />
}
