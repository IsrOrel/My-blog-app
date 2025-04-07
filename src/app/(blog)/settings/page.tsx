"use client"
import { useTranslation } from '@/lib/i18n';
import { useState } from 'react';

export default function SettingPage() {
  const { locale, t, changeLanguage } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLanguageChange = async (newLocale: string) => {
    if (newLocale === locale) return; // Don't change if already selected
    
    setIsLoading(true);
    try {
      // Change the UI language
      changeLanguage(newLocale);
      
      // Update the preference in the database for logged-in users
      const response = await fetch('/api/auth/profile/update-language', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language: newLocale }),
      });
      
      if (!response.ok) {
        console.error('Failed to update language preference');
      }
      
      // Add a slight delay before refreshing to ensure storage is updated
      setTimeout(() => {
        window.location.reload();
      }, 300);
      
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
    // Note: We don't set isLoading to false here because we're refreshing the page
  };
  
  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-5xl font-extrabold text-white text-center">{t('Settings')}</h1>
      <p className="text-xl text-white mt-2 text-center">{t('This is a simple blog application built with Next.js')}</p>
      
      {/* Language section */}
      <div className="mt-8 w-full max-w-md bg-white/10 p-6 rounded-lg backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">{t('Language Settings')}</h2>
        
        {/* Current language display - centered */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-white mb-2">{t('Current Language')}</p>
          <p className="font-semibold text-white text-xl">
            {locale === "en" ? "English" : "עברית"}
          </p>
        </div>
        
        {/* Language buttons - centered */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => handleLanguageChange("en")}
            disabled={isLoading || locale === "en"}
            className={`px-6 py-2 rounded transition-colors ${
              locale === "en" 
                ? "bg-blue-600 text-white cursor-default" 
                : "bg-gray-700 text-white hover:bg-gray-600"
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            English
          </button>
          
          <button
            onClick={() => handleLanguageChange("he")}
            disabled={isLoading || locale === "he"}
            className={`px-6 py-2 rounded transition-colors ${
              locale === "he" 
                ? "bg-blue-600 text-white cursor-default" 
                : "bg-gray-700 text-white hover:bg-gray-600"
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            עברית
          </button>
        </div>
        
        <p className="text-white/70 text-sm text-center">
          {t('Changing the language will affect the entire application interface.')}
        </p>
      </div>
    </div>
  );
}