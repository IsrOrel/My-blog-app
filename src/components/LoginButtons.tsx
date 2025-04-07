'use client'
import { useRouter } from 'next/navigation';

export default function LoginButtons() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <button onClick={() => router.push('/login')} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Log In
      </button>
      <button onClick={() => router.push('/signup')} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Sign Up
      </button>
    </div>
  );
}
