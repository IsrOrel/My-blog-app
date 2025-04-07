// src/app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { createUser } from '@/lib/data';
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { signupSchema } from '../../../../lib/validation';
import { hashPassword } from '@/lib/auth';  // Add this import
import bcrypt from 'bcrypt';
export async function POST(request: Request) {
  try {
    const json = await request.json();
    console.log('Received data:', json);

    if (!json) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    // Validate the input data
    const { name, email, password } = signupSchema.parse(json);
    
    // Hash the password before creating user
    const hashedPassword = await hashPassword(password);
    const match = await bcrypt.compare(password, hashedPassword);

    console.log('Password match:', match);

    
    // Create the new user with hashed password
    const newUser = await createUser({ 
      name, 
      email, 
      password: hashedPassword  // Pass the hashed password
    });

    // Create response first
    const response = new NextResponse(
      JSON.stringify({
        user: {
          email: newUser.email,
          username: newUser.name
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

    // Then set up session
    const session = await getIronSession<SessionData>(request, response, sessionOptions);
    session.user = { 
      name: newUser.name,
      email: newUser.email, 
      username: newUser.name 
    };
    await session.save();

    return response;

  } catch (error: unknown) {
    console.error('Signup error:', error);
  
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: error.message  // Don't parse, just send the message
        },
        { status: 400 }
      );
    }
  
    if (error instanceof Error) {
      if (error.message === 'User already exists') {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }  
}