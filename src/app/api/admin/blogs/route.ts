import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(blogs);
}

export async function POST(req: NextRequest) {
  const b = await req.json();
  const blog = await prisma.blog.create({
    data: {
      title: b.title ?? '',
      excerpt: b.excerpt ?? '',
      image: b.image ?? '',
      category: b.category ?? '',
      author: b.author ?? '',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      comments: 0,
      tags: Array.isArray(b.tags) ? b.tags : [],
      content: Array.isArray(b.content) ? b.content : [],
    },
  });
  return NextResponse.json(blog, { status: 201 });
}
