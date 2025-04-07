// src/lib/session.tsx
import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  cookieName: "myblog_session", // Name of the session cookie
  password: process.env.SESSION_SECRET as string, 
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // Secure in production
  },
};

export type SessionData = {
  user?: {
    id: string; // Add user ID
    name: string;
    email: string;
    username: string;
    language?: string; // Add language preference
  };
};