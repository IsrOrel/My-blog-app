import React from 'react';

export default function Start() {
    return (
        <main className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
            {/* This div centers everything in the page */}
            <div className="flex flex-col items-center justify-center h-full p-6">
                <h1 className="text-5xl font-extrabold text-white">Welcome to My Blog</h1>
                <p className="text-xl text-white mt-4">Create, read, and share posts.</p>
                <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Log In</button>
                <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Sign Up</button>
            </div>
        </main>
    );
}