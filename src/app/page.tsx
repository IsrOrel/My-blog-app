import LoginButtons from '@/components/LoginButtons';
import React from 'react';

export default function Start() {
    return (
        <main className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
            {/* This div centers everything in the page */}
            <div className="flex flex-col items-center justify-center h-full p-6">
                <h1 className="text-5xl font-extrabold text-white">Welcome to My Blog</h1>
                <p className="text-xl text-white mt-4">Create, read, and share posts.</p>
                <LoginButtons/>
            </div>
        </main>
    );
}