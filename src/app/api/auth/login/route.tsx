import { getUser } from '@/lib/data';
import { verifyPassword } from '@/lib/auth';  // Add this import
import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await getUser(email);

    if (!user) {
      console.log('User not found:', email);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify the password using bcrypt
    console.log('Stored password:', user.password);
    console.log('Input password:', password);
    const isValidPassword = await verifyPassword(password, user.password);
    
    if (!isValidPassword) {
      console.log('Invalid password for user:', email);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create response first
    const response = NextResponse.json({
      user: { 
        email: user.email, 
        username: user.name 
      }
    });

    // Set up session
    const session = await getIronSession<SessionData>(request, response, sessionOptions);
    session.user = {
      name: user.name, 
      email: user.email, 
      username: user.name 
    };
    await session.save();

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}