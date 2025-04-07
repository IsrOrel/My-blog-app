export type Post = {
    id: string;         // Unique identifier for each post
    author: string;     // Username of who wrote it
    content: string;    // The actual post content
    createdAt: Date;    // When the post was created
  };