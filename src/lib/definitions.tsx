export type User = {
    id: string;
    name: string;
    email: string;
    password: string; // Note: In production, never store plain-text passwords
  };