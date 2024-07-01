// global styles shared across the entire site
import * as React from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import * as Fathom from 'fathom-client'
import { SidebarProvider } from 'Providers'
// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
import { fathomConfig, fathomId, posthogConfig, posthogId } from 'lib/config'
import posthog from 'posthog-js'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

import Layout from '@/components/Layout'
import '@/styles/global.css'
import '@/styles/prism-theme.css'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  React.useEffect(() => {
    function onRouteChangeComplete() {
      if (fathomId) {
        Fathom.trackPageview()
      }

      if (posthogId) {
        posthog.capture('$pageview')
      }
    }

    if (fathomId) {
      Fathom.load(fathomId, fathomConfig)
    }

    if (posthogId) {
      posthog.init(posthogId, posthogConfig)
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  return (
    <SidebarProvider>
      {/* eslint-disable-next-line react/no-children-prop */}
      <Layout children={<Component {...pageProps} />} />
    </SidebarProvider>
  )
}
