import { NextResponse } from 'next/server';
import { deletePostById } from '../../../../lib/data';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await deletePostById(params.id);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' }, 
      { status: 500 }
    );
  }
}