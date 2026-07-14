import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'
import { ScrollToTop } from '@/components/scroll-to-top'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Premium Vehicle Rental Platform',
  description: 'Rent luxury and economy vehicles with ease. Premium selection, competitive prices, and exceptional service.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#2563EB',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background scroll-smooth" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <ScrollToTop />
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
