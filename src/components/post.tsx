"use client";
import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';

interface PostProps {
  onPost: (content: string) => Promise<void>;
}

const Post: React.FC<PostProps> = ({ onPost }) => {
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const { locale, t } = useTranslation();
  const isRTL = locale === 'he';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (content.trim() === '') return;
    
    setIsPosting(true);
    
    try {
      await onPost(content);
      setContent('');
    } catch (error) {
      console.error('Error posting:', error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className={`w-full max-w-3xl mt-8 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <h3 className="text-xl font-bold text-white mb-2">
        {t('write_new_post')}
      </h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t('whats_on_your_mind')}
          className={`p-3 mb-2 bg-gray-800 text-white rounded-md border border-gray-600 min-h-24 ${isRTL ? 'text-right' : 'text-left'}`}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
        
        <div className={`${isRTL ? 'self-start' : 'self-end'}`}>
          <button
            type="submit"
            disabled={isPosting || content.trim() === ''}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-500"
          >
            {isPosting ? '...' : t('post')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Post;