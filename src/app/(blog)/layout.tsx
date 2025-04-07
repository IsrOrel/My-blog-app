// src/app/(blog)/layout.tsx
"use client"
import { useEffect, useState } from 'react'
import SideNav from '../../components/sidenav'
import Footer from '../../components/footer'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isRTL, setIsRTL] = useState(false)
  
  useEffect(() => {
    // Get the language preference
    const storedLocale = localStorage.getItem('preferredLanguage') || 'en'
    setIsRTL(storedLocale === 'he')
    
    // Listen for language changes
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.locale) {
        setIsRTL(customEvent.detail.locale === 'he');
      }
    };
    
    // Also listen for storage events in case localStorage changes
    const handleStorageChange = () => {
      const currentLocale = localStorage.getItem('preferredLanguage') || 'en';
      setIsRTL(currentLocale === 'he');
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [])
  
  // Apply RTL-specific styles when needed
  const contentStyles = isRTL 
    ? "flex-1 mr-64 ml-0 flex flex-col" // For RTL
    : "flex-1 ml-64 flex flex-col"      // For LTR
    
  return (
    <div className="flex h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <SideNav />
      <div className={contentStyles}>
        <main className="flex-1 overflow-auto bg-gradient-to-r from-blue-500 to-teal-500">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}