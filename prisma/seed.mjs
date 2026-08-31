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
  const industries = read('industries.json', []);

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

  // Industries — keyed by slug, and spaced like the others so the seeded
  // order is the order the cards were in before they came from the CMS.
  for (let i = 0; i < industries.length; i++) {
    const n = industries[i];
    const data = {
      name: n.name ?? '',
      sub: n.sub ?? '',
      icon: n.icon ?? 'Building2',
      desc: n.desc ?? '',
      useCases: Array.isArray(n.useCases) ? n.useCases : [],
      content: Array.isArray(n.content) ? n.content : [],
    };
    await prisma.industry.upsert({
      where: { slug: n.slug },
      update: data,
      // spaced into the past, ascending, so the seeded order holds and anything
      // added later is genuinely newer and lands at the end of the grid
      create: { slug: n.slug, ...data, createdAt: new Date(Date.now() - (industries.length - i) * 60000) },
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

  console.log(`Seeded: ${blogs.length} blogs, ${jobs.length} jobs, ${testimonials.length} testimonials, ${industries.length} industries, ${Object.keys(siteImages).length} site images`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
