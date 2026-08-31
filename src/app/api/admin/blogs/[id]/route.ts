import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizeHtml, toDocuments } from '@/lib/richtext';

export const dynamic = 'force-dynamic';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const blog = await prisma.blog.findUnique({ where: { id: params.id } });
  if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(blog);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const b = await req.json();
  try {
    const blog = await prisma.blog.update({
      where: { id: params.id },
      data: {
        ...(b.title !== undefined && { title: b.title }),
        ...(b.excerpt !== undefined && { excerpt: b.excerpt }),
        ...(b.image !== undefined && { image: b.image }),
        ...(b.category !== undefined && { category: b.category }),
        ...(b.author !== undefined && { author: b.author }),
        ...(Array.isArray(b.tags) && { tags: b.tags }),
        ...(Array.isArray(b.content) && { content: b.content }),
        ...(b.html !== undefined && { html: sanitizeHtml(String(b.html)) }),
        ...(b.documents !== undefined && { documents: toDocuments(b.documents) }),
      },
    });
    return NextResponse.json(blog);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.blog.delete({ where: { id: params.id } }).catch(() => {});
  return NextResponse.json({ ok: true });
}
