'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Post from '@/components/post';
import HebrewPost from '@/components/HebrewPost';
import { useTranslation } from '@/lib/i18n';

// Define interfaces for our types
interface PostType {
  id: string;
  author: string;
  content: string;
  timestamp: number;
  created_at?: string; // Optional since we convert it to timestamp
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { locale, t } = useTranslation();
  const isRTL = locale === 'he';

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/me');
        
        if (response.status !== 200) {
          router.replace('/login');
        } else {
          const data = await response.json();
          
          if (data.user) {
            setIsAuthenticated(true);
            setUsername(data.user.username);
          } else {
            router.replace('/login');
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
        router.replace('/login');
      }
    };

    checkSession();
  }, [router]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/posts');
        
        if (response.ok) {
          const data = await response.json();
          
          if (Array.isArray(data)) {
            const formattedPosts = data.map((post: any) => ({ 
              ...post, 
              timestamp: new Date(post.created_at).getTime()
            }));
            
            setPosts(formattedPosts);
          } else {
            setError("Unexpected data format");
          }
        } else {
          setError(`Failed to fetch posts: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError("Error fetching posts");
      } finally {
        setIsLoading(false);
      }
    };
  
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);
  
  const handleDeletePost = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      }
    } catch (error) {
      console.error('Error while deleting post:', error);
    }
  };
  
  const handleNewPost = async (content: string) => {
    if (!username) return;
  
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: username, content }),
      });
  
      if (response.ok) {
        const newPost = await response.json();
        setPosts((prev) => [{
          id: newPost.id,
          author: newPost.author,
          content: newPost.content,
          timestamp: new Date(newPost.created_at).getTime()
        }, ...prev]);
      }
    } catch (error) {
      console.error('Exception while posting:', error);
    }
  };
  
  if (!isAuthenticated) {
    return (
      <main className="flex flex-col items-center justify-center p-6">
        <h1 className="text-5xl font-extrabold text-white">
          {t('loading')}
        </h1>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center p-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="text-5xl font-extrabold text-white text-center">
        {t('welcome_to_my_blog')}
      </h1>
      
      {username && (
        <p className="text-xl text-white mt-2">
          {t('logged_in_as')}: {username}
        </p>
      )}
      
      <p className="text-xl text-white mt-4">
        {t('create_read_share')}
      </p>

      <Post onPost={handleNewPost} />

      <div className={`w-full max-w-3xl mt-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h2 className={`text-2xl font-bold text-white mb-4 w-full ${isRTL ? 'text-right' : 'text-left'}`}>
          {t('recent_posts')}
        </h2>
        
        <div className="overflow-y-auto p-4 rounded-md">
          {isLoading ? (
            <p className="text-white text-center">Loading posts...</p>
          ) : error ? (
            <p className="text-white text-center text-red-500">{error}</p>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              isRTL ? (
                <HebrewPost
                  key={post.id}
                  post={post}
                  onDelete={handleDeletePost}
                />
              ) : (
                <div 
                  key={post.id} 
                  className="relative p-4 mb-4 border border-gray-600 rounded-md bg-gradient-to-r from-red-500 to-blue-500"
                >
                  {/* Timestamp */}
                  <div className="absolute top-2 right-2 text-sm text-white">
                    {new Date(post.timestamp).toLocaleString()}
                  </div>

                  {/* Author section */}
                  <div className="flex items-center mt-6 mb-2">
                    <div className="relative w-[50px] h-[50px] mr-2">
                      <Image
                        src="/person.png"
                        alt="User"
                        fill
                        sizes="50px"
                      />
                    </div>
                    <p className="text-white font-bold">{post.author}:</p>
                  </div>
                  
                  {/* Post content */}
                  <p className="text-white ml-14 text-left">
                    {post.content}
                  </p>
                  
                  {/* Delete button */}
                  <div className="absolute bottom-2 right-2 w-10 h-10">
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="bg-transparent border-0 p-0 w-full h-full relative"
                    >
                      <Image
                        src="/delete-icon.png"
                        alt="Delete"
                        fill
                        sizes="40px"
                      />
                    </button>
                  </div>
                </div>
              )
            ))
          ) : (
            <p className="text-white text-center mt-4">
              {t('no_posts_yet')}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}