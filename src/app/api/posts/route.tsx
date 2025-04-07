import { NextResponse } from 'next/server';
import { createPost, getPosts } from '../../../lib/data';


export async function POST(req: Request) {
  try {
    const { author, content } = await req.json();
    
    if (!author || !content) {
      return NextResponse.json({ error: 'Missing author or content' }, { status: 400 });
    }

    // Use createPost function to save to database
    const newPost = await createPost({ author, content });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json(posts, { status: 200});
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }

}