'use client'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LoadingProvider } from '@/components/admin/is-loading'
import { ViewCustomerProvider } from '@/contexts/view-customer-context'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LoadingProvider>
      <ViewCustomerProvider>
        <html lang="pt-BR">
          <body className={inter.className}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </body>
        </html>
      </ViewCustomerProvider>
    </LoadingProvider>
  )
}
