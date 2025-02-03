import PageLayout from "../components/layout";
import Post from "../components/post";

export default function Home() {
  return (
    <PageLayout> 
      <main className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
        {/* This div centers everything in the page */}
        <div className="flex flex-col items-center justify-center h-full p-6">
          <h1 className="text-5xl font-extrabold text-white">Welcome to My Blog</h1>
          <p className="text-xl text-white mt-4">Create, read, and share posts.</p>
          <Post/>
          {/* Recent Posts Section */}
          <div className="w-full max-w-3xl mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Recent Posts</h2>
            <div className="h-64 overflow-y-auto p-4 rounded-md">

              <p className="text-white text-center mt-16">No posts available yet.</p>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
