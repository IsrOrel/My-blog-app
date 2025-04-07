import { NextResponse } from 'next/server';
import { updateUserName, getUser } from '@/lib/data';

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const { email, name } = body;
    
    if (!email || !name || name.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Email and name are required' },
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
    
    // Update the user's name using their ID
    await updateUserName(user.id, name);
    
    // Get the updated user information
    const updatedUser = await getUser(email);
    
    return NextResponse.json({ 
      success: true,
      user: { name: updatedUser.name }
    });
  } catch (error) {
    console.error('Error updating name:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while updating your name' },
      { status: 500 }
    );
  }
}