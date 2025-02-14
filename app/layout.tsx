import type { Metadata } from 'next'
import './globals.css'
import { ThemeWrapper } from '@/components/theme-wrapper'

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
  return (
    <link
      rel="icon"
      type="image/svg+xml"
      href={'/ndex-logo.svg'}
    />
  )
}

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
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  )
}
