import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EESTEC LC Sarajevo - Membership Card',
  description: 'Member card, events, discounts and profile management for EESTEC LC Sarajevo',
  icons: {
    icon: '/logo-red.png',
    apple: '/logo-red.png',
  },
  openGraph: {
    title: 'EESTEC LC Sarajevo',
    description: 'Member card, events, discounts and profile management',
    images: ['/logo-red.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white font-sf-pro">
        {children}
      </body>
    </html>
  )
}
