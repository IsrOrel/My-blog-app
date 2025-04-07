// src/lib/i18n.tsx
import { useEffect, useState } from 'react'

interface Translations {
  [key: string]: string;
}

// Load translations
const loadTranslations = async (locale: string): Promise<Translations> => {
  try {
    const translations = await import(`../../public/locales/${locale}/common.json`)
    return translations.default || translations
  } catch (error) {
    console.error(`Could not load translations for ${locale}`, error)
    return {}
  }
}

// Translation hook
export const useTranslation = () => {
  const [locale, setLocale] = useState<string>('en')
  const [translations, setTranslations] = useState<Translations>({})

  useEffect(() => {
    // Get the locale from localStorage
    const storedLocale = localStorage.getItem('preferredLanguage') || 'en'
    setLocale(storedLocale)
    
    const loadLocale = async () => {
      const t = await loadTranslations(storedLocale)
      setTranslations(t)
    }
    loadLocale()
  }, [])

  const t = (key: string) => {
    return translations[key] || key
  }

  // This function should be inside the hook
  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale)
    localStorage.setItem('preferredLanguage', newLocale)
    
    // In App Router, we need to set the HTML dir and lang attributes
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale
      document.documentElement.dir = newLocale === 'he' ? 'rtl' : 'ltr'
    }
    
    // Load new translations
    loadTranslations(newLocale).then(newTranslations => {
      setTranslations(newTranslations)
    })
    
    // Dispatch events to notify other components
    window.dispatchEvent(new Event('storage'))
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { locale: newLocale } }))
    
    // Don't reload the page when changing language
    // The commented out code below is what causes the reload issue
    /*
    setTimeout(() => {
      window.location.reload();
    }, 300);
    */
  }

  return { t, locale, changeLanguage }
}