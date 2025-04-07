"use client"
// src/app/layout.tsx
import './globals.css' // If you have this file
import { useEffect, useState } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [dir, setDir] = useState('ltr')
  const [lang, setLang] = useState('en')
  
  // Since this is a Server Component, we need to use useEffect to handle client-side changes
  useEffect(() => {
    // Get the locale from localStorage or other client-side source
    const storedLocale = localStorage.getItem('preferredLanguage') || 'en'
    setLang(storedLocale)
    setDir(storedLocale === 'he' ? 'rtl' : 'ltr')
    
    // Listen for language changes
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.locale) {
        setLang(customEvent.detail.locale);
        setDir(customEvent.detail.locale === 'he' ? 'rtl' : 'ltr');
      }
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [])

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body suppressHydrationWarning className="flex min-h-screen flex-col">
        {children}
      </body>
    </html>
  );
}