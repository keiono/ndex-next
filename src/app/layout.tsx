import type { Metadata } from 'next'
import './globals.css'
import { ThemeWrapper } from '@/components/theme-wrapper'
import { ConfigProvider } from '@/lib/contexts/ConfigContext'
import { NavBar } from '@/components/NavBar'
import { MainPanel } from '@/components/MainPanel'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'NDEx 3',
  description: 'Next-generation NDEx Web Client',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
}

function DynamicFavicon() {
  return <link rel="icon" type="image/svg+xml" href={'/ndex-logo.svg'} />
}

/**
 * This is the base layout of the page for all pages
 *
 * It has the basic components inclusing:
 * - NavBar
 * - MainPanel (container for the main content)
 * - ThemeWrapper (for theming)
 * - ConfigProvider (for configuration provided by the JSON file)
 * - DynamicFavicon (for dynamic favicon generated from the logo)
 * - Metadata (for SEO)
 * - Global styles
 * - Footer (not included yet)
 *
 *
 * @param children
 * @returns
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <DynamicFavicon />
      </head>
      <body className={`antialiased min-h-screen`}>
        <ConfigProvider>
          <ThemeWrapper>
            <NavBar />
            <MainPanel>{children}</MainPanel>
            <Footer />
          </ThemeWrapper>
        </ConfigProvider>
      </body>
    </html>
  )
}
