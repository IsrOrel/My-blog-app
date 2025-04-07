import { NextResponse } from 'next/server';
import { updateUserPassword, getUser } from '@/lib/data';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const { email, password } = body;
    
    if (!email || !password || password.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Check password strength
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }
    
    // Get the user to find their ID
    const user = await getUser(email);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Update the user's password using their ID
    await updateUserPassword(user.id, hashedPassword);
    
    return NextResponse.json({ 
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while updating your password' },
      { status: 500 }
    );
  }
}