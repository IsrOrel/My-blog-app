// components/LanguageSwitcher.jsx
"use client"
import { useTranslation } from '@/lib/i18n';
import { useState } from 'react';

const LanguageSwitcher = () => {
  const { locale, t, changeLanguage } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  
  const toggleLanguage = async () => {
    setIsLoading(true);
    const newLocale = locale === 'en' ? 'he' : 'en';
    
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
        const errorData = await response.json();
        console.error('Error details:', errorData);
      } else {
        console.log('Language preference updated successfully');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <button 
      onClick={toggleLanguage}
      disabled={isLoading}
      className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400"
    >
      {isLoading ? "..." : locale === 'en' ? 'עברית' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;