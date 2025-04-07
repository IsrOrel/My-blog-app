"use client"
import { useTranslation } from '@/lib/i18n';

export default function AboutPage() {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-5xl font-extrabold text-white">{t('About Us')}</h1>
      <p className="text-xl text-white mt-2">{t('This is a simple blog application built with Next.js')}</p>
      <p className="text-xl text-white mt-2">{t('Feel free to explore and create your own blog posts')}</p>
    </div>
  );
}