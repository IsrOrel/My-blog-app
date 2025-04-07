import { NextResponse } from 'next/server';
import { updateUserEmail, getUser } from '@/lib/data';

export async function POST(req: Request) {
    try {
        // Parse the request body
        const body = await req.json();
        const { currentEmail, newEmail } = body;
        
        // Validate input
        if (!currentEmail || !newEmail || newEmail.trim() === '') {
            return NextResponse.json(
                { success: false, message: 'Current email and new email are required' },
                { status: 400 }
            );
        }
        
        // Check if new email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) {
            return NextResponse.json(
                { success: false, message: 'Invalid email format' },
                { status: 400 }
            );
        }
        
        // Get the user to find their ID
        const user = await getUser(currentEmail);
        
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }
        
        // Update the user's email using their ID
        await updateUserEmail(user.id, newEmail);
        
        // Get the updated user information
        const updatedUser = await getUser(newEmail);
        
        return NextResponse.json({ 
            success: true,
            user: { email: updatedUser.email }
        });
    } catch (error) {
        console.error('Error updating email:', error);
        
        // Check for already in use error
        if (error instanceof Error && error.message.includes('already in use')) {
            return NextResponse.json(
                { success: false, message: 'Email already in use' },
                { status: 409 }
            );
        }
        
        return NextResponse.json(
            { success: false, message: 'An error occurred while updating your email' },
            { status: 500 }
        );
    }
}