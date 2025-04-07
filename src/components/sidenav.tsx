// components/sidenav.tsx
"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n'

export default function SideNav() {
  const {  locale } = useTranslation()
  const [isRTL, setIsRTL] = useState(false)
  
  useEffect(() => {
    // Set RTL based on current locale and add event listener
    const updateDirection = () => {
      const currentLocale = localStorage.getItem('preferredLanguage') || 'en'
      setIsRTL(currentLocale === 'he')
      
      // Also update HTML attributes to ensure proper document direction
      if (typeof document !== 'undefined') {
        document.documentElement.dir = currentLocale === 'he' ? 'rtl' : 'ltr'
        document.documentElement.lang = currentLocale
      }
    }
    
    // Initial update
    updateDirection()
    
    // Listen for storage changes (when language changes in another component)
    window.addEventListener('storage', updateDirection)
    
    // Create a custom event listener for language changes
    window.addEventListener('languageChanged', updateDirection)
    
    return () => {
      window.removeEventListener('storage', updateDirection)
      window.removeEventListener('languageChanged', updateDirection)
    }
  }, [locale]) // Re-run effect when locale changes

  // Update isRTL whenever locale changes
  useEffect(() => {
    setIsRTL(locale === 'he')
  }, [locale])
  
  // Adjust positioning based on RTL/LTR
  const sideNavStyles = isRTL
    ? "w-64 bg-gray-800 text-white h-full p-6 fixed top-0 right-0"
    : "w-64 bg-gray-800 text-white h-full p-6 fixed top-0 left-0"
  
  // Text alignment based on RTL/LTR
  const textAlign = isRTL ? "text-right" : "text-left"
  
  return (
    <div className={sideNavStyles}>
      <h2 className={`text-xl font-bold mb-4 ${textAlign}`}>My Blog</h2>
      <ul className={textAlign}>
        <li>
          <Link href="/posts" className="block py-2 px-4 hover:bg-gray-600">
            Home
          </Link>
        </li>
        <li>
          <Link href="/profile" className="block py-2 px-4 hover:bg-gray-600">
            Profile
          </Link>
        </li>
        <li>
          <Link href="/settings" className="block py-2 px-4 hover:bg-gray-600">
            Settings
          </Link>
        </li>
        <li>
          <Link href="/about" className="block py-2 px-4 hover:bg-gray-600">
            About Us
          </Link>
        </li>
      </ul>
    </div>
  )
}