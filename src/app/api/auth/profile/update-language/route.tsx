// src/app/api/auth/profile/update-language/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';
import { updateUserLanguage } from '@/lib/data';

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  
  // Check if user is authenticated
  if (!session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const { language } = await req.json();
    
    if (!language || !['en', 'he'].includes(language)) {
      return NextResponse.json({ error: 'Invalid language' }, { status: 400 });
    }
    
    const userEmail = session.user.email;
    
    // Update in database using email
    await updateUserLanguage(userEmail, language);
    
    // Update the session with the new language preference
    session.user = {
      ...session.user,
      language
    };
    await session.save();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update language preference:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}