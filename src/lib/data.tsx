// src/lib/data.ts
import { neon } from '@neondatabase/serverless';



export async function getUser(email: string) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  
  try {
    const user = await sql`
      SELECT id, name, email, password 
      FROM users 
      WHERE email = ${email}
      LIMIT 1
    `;
    
    return user[0] || null;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch user');
  }
}

export async function createUser({ name, email, password }: { 
  name: string; 
  email: string; 
  password: string; 
}) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  
  try {
    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email} LIMIT 1
    `;
    
    if (existingUser.length > 0) {
      throw new Error('User already exists');
    }

    // Insert new user with the already hashed password
    const newUser = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${password})
      RETURNING id, name, email
    `;
    
    return newUser[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}
export async function verifyCredentials(email: string, password: string) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  
  try {
    const user = await sql`
      SELECT id, name, email 
      FROM users 
      WHERE email = ${email} AND password = ${password}
      LIMIT 1
    `;
    
    return user[0] || null;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to verify credentials');
  }
}
export async function createPost({ author, content }: { author: string; content: string }) {
  const sql = neon(`${process.env.DATABASE_URL}`);

  try {
    // Ensure the user exists
    const existingUser = await sql`
      SELECT id FROM users WHERE name = ${author} LIMIT 1
    `;
    if (existingUser.length === 0) {
      throw new Error('User does not exist');
    }
    

    // Insert new post
    const newPost = await sql`
    INSERT INTO posts (author, content, created_at)
    VALUES (${author}, ${content}, CURRENT_TIMESTAMP)
    RETURNING id, author, content, created_at
  `;

    return newPost[0]; // Ensure correct return
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function getPosts() {
  const sql = neon(`${process.env.DATABASE_URL}`);

  try {
    const posts = await sql`
      SELECT id, author, content, created_at 
      FROM posts 
      ORDER BY created_at DESC
    `;
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}


// Get posts by specific author
export async function getPostsByAuthor(author: string) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  
  try {
    const posts = await sql`
      SELECT id, author, content, created_at 
      FROM posts 
      WHERE author = ${author}
      ORDER BY created_at DESC
    `;
    
    return posts;
  } catch (error) {
    console.error('Error fetching author posts:', error);
    throw error;
  }
}

// Get specific post by id
export async function getSpecificPost(id: string) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  
  try {
    const post = await sql`
      SELECT id, author, content, created_at 
      FROM posts 
      WHERE id = ${id}
      LIMIT 1
    `;
    
    return post[0] || null;
  } catch (error) {
    console.error('Error fetching specific post:', error);
    throw error;
  }
}
export async function deletePostById(id: string) {
  const sql = neon(`${process.env.DATABASE_URL}`);

  try {
    await sql`
      DELETE FROM posts 
      WHERE id = ${id}
    `;
    return { success: true, message: "Post deleted successfully" };
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}
export async function updateUserName(id: string, name: string) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  
  try {
    const updatedUser = await sql`
      UPDATE users
      SET name = ${name}
      WHERE id = ${id}
      RETURNING id, name, email
    `;
    
    if (updatedUser.length === 0) {
      throw new Error('User not found');
    }
    
    return updatedUser[0];
  } catch (error) {
    console.error('Error updating user name:', error);
    throw error;
  }
}

// Update a user's email
export async function updateUserEmail(id: string, email: string) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  
  try {
    // Check if email already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email} AND id != ${id} LIMIT 1
    `;
    
    if (existingUser.length > 0) {
      throw new Error('Email already in use');
    }
    
    const updatedUser = await sql`
      UPDATE users
      SET email = ${email}
      WHERE id = ${id}
      RETURNING id, name, email
    `;
    
    if (updatedUser.length === 0) {
      throw new Error('User not found');
    }
    
    return updatedUser[0];
  } catch (error) {
    console.error('Error updating user email:', error);
    throw error;
  }
}

// Update a user's password
export async function updateUserPassword(id: string, password: string) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  
  try {
    const updatedUser = await sql`
      UPDATE users
      SET password = ${password}
      WHERE id = ${id}
      RETURNING id
    `;
    
    if (updatedUser.length === 0) {
      throw new Error('User not found');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error updating user password:', error);
    throw error;
  }
}

// Delete a user
export async function deleteUser(id: string) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  
  try {
    // First delete any posts by this user
    await sql`
      DELETE FROM posts 
      WHERE author IN (SELECT name FROM users WHERE id = ${id})
    `;
    
    // Then delete the user
    const result = await sql`
      DELETE FROM users
      WHERE id = ${id}
      RETURNING id
    `;
    
    if (result.length === 0) {
      throw new Error('User not found');
    }
    
    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}
export async function updateUserLanguage(userEmail: string, language: string) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  
  try {
    // SQL query to update the user's language preference using email instead of id
    const result = await sql`
      UPDATE users 
      SET language = ${language} 
      WHERE email = ${userEmail} 
      RETURNING id, language
    `;
    
    return result[0] || null;
  } catch (error) {
    console.error('Error updating user language:', error);
    throw error;
  }
}
export async function getUserLanguage(userId: string) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  
  try {
    // SQL query to get the user's language preference
    const result = await sql`
      SELECT language FROM users WHERE id = ${userId}
    `;
    
    return result[0]?.language || 'en';
  } catch (error) {
    console.error('Error getting user language:', error);
    return 'en'; // Default to English on error
  }
}