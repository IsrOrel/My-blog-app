// src/app/layout.tsx
import './globals.css'  // Add this line!
export const metadata = {
  title: 'My Blog',
  description: 'My awesome blog built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}