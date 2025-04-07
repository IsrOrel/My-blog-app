'use server';

import { neon } from '@neondatabase/serverless';
import { redirect } from 'next/navigation';

export async function createUser(formData: FormData) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');

  await sql('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);

  // Redirect to login page
  redirect('/login');
}
