"use client";
import Image from 'next/image';

interface HebrewPostProps {
  post: {
    id: string;
    author: string;
    content: string;
    timestamp: number;
  };
  onDelete: (id: string) => void;
}

const HebrewPost: React.FC<HebrewPostProps> = ({ post, onDelete }) => {
  return (
    <div 
      className="relative p-4 mb-4 border border-gray-600 rounded-md bg-gradient-to-l from-red-500 to-blue-500"
      dir="rtl"
    >
      {/* Timestamp in the correct position for RTL */}
      <div className="absolute top-2 right-2 text-sm text-white">
        {new Date(post.timestamp).toLocaleString('he-IL', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        })}
      </div>

      {/* Delete button on the left side for RTL */}
      <div className="absolute top-2 left-2 w-10 h-10">
        <button 
          onClick={() => onDelete(post.id)}
          className="bg-transparent border-0 p-0 w-full h-full relative hover:opacity-80 transition-opacity"
          aria-label="מחק פוסט"
        >
          <Image
            src="/delete-icon.png"
            alt="מחק"
            fill
            sizes="40px"
          />
        </button>
      </div>

      {/* Author section with correct RTL layout - photo first then name */}
      <div className="flex items-center mb-2 mt-12">
        <div className="relative w-[50px] h-[50px] ml-2">
          <Image
            src="/person.png"
            alt="משתמש"
            fill
            sizes="50px"
          />
        </div>
        <p className="text-white font-bold">{post.author}:</p>
      </div>
      
      {/* Post content with right alignment but with margin from the profile image */}
      <p className="text-white mr-14 text-right">
        {post.content}
      </p>
    </div>
  );
};

export default HebrewPost;