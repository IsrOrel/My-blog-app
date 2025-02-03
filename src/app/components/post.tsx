
const Post = () => {
    return (
        <div className="w-full max-w-3xl bg-white p-6 rounded-md shadow-md mt-8">
        <h2 className="text-xl font-bold mb-4">Write a New Post</h2>
        <textarea
          placeholder="What's on your mind?"
          rows={5}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded-md">Post</button>
      </div>
    );
  };
  
  export default Post;
  