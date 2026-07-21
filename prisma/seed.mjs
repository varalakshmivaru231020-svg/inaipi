// Seeds Postgres from the JSON files in /data. Idempotent (upserts by id/key).
// Run with: npm run db:seed
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();
const DATA = join(process.cwd(), 'data');

function read(name, fallback) {
  try {
    return JSON.parse(readFileSync(join(DATA, name), 'utf-8'));
  } catch {
    return fallback;
  }
}

async function main() {
  const blogs = read('blogs.json', []);
  const jobs = read('jobs.json', []);
  const testimonials = read('testimonials.json', []);
  const siteImages = read('site-images.json', {});

  // Blogs — space createdAt so the array order (first = newest) is preserved.
  for (let i = 0; i < blogs.length; i++) {
    const b = blogs[i];
    const data = {
      title: b.title ?? '',
      excerpt: b.excerpt ?? '',
      image: b.image ?? '',
      category: b.category ?? '',
      author: b.author ?? '',
      date: b.date ?? '',
      comments: b.comments ?? 0,
      tags: Array.isArray(b.tags) ? b.tags : [],
      content: Array.isArray(b.content) ? b.content : [],
    };
    await prisma.blog.upsert({
      where: { id: String(b.id) },
      update: data,
      create: { id: String(b.id), ...data, createdAt: new Date(Date.now() - i * 60000) },
    });
  }

  // Jobs
  for (let i = 0; i < jobs.length; i++) {
    const j = jobs[i];
    const data = {
      slug: j.slug,
      title: j.title ?? '',
      type: j.type ?? 'Full time',
      location: j.location ?? '',
      salary: j.salary ?? '',
      desc: j.desc ?? '',
      responsibilities: Array.isArray(j.responsibilities) ? j.responsibilities : [],
      requirements: Array.isArray(j.requirements) ? j.requirements : [],
      offers: Array.isArray(j.offers) ? j.offers : [],
    };
    await prisma.job.upsert({
      where: { id: String(j.id) },
      update: data,
      create: { id: String(j.id), ...data, createdAt: new Date(Date.now() - i * 60000) },
    });
  }

  // Testimonials
  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i];
    const data = {
      name: t.name ?? '',
      role: t.role ?? '',
      quote: t.quote ?? '',
      avatar: t.avatar ?? '',
      stat: t.stat ?? '',
      statLabel: t.statLabel ?? '',
      stars: Number(t.stars) || 5,
    };
    await prisma.testimonial.upsert({
      where: { id: String(t.id) },
      update: data,
      create: { id: String(t.id), ...data, createdAt: new Date(Date.now() - i * 60000) },
    });
  }

  // Site images (key/value)
  for (const [key, value] of Object.entries(siteImages)) {
    await prisma.siteImage.upsert({
      where: { key },
      update: { value: String(value ?? '') },
      create: { key, value: String(value ?? '') },
    });
  }

  console.log(`Seeded: ${blogs.length} blogs, ${jobs.length} jobs, ${testimonials.length} testimonials, ${Object.keys(siteImages).length} site images`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
