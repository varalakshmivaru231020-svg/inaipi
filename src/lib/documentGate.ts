import { prisma } from '@/lib/prisma';
import { toDocuments } from '@/lib/richtext';

/**
 * Whether a particular document asks the visitor for their details first.
 *
 * The flag lives with the document, in the `documents` JSON of the blog post,
 * buyer resource or industry it is attached to. The browser is handed the same
 * flag so it knows whether to show the form, but it is settled here as well:
 * whether a document is gated is not the caller's to assert. The lookup is by
 * the file's own URL, so a caller cannot point at an ungated document and post
 * against a gated one.
 *
 * Fail closed. A document nobody can find, a URL that was never sent and a
 * database that cannot be reached all count as gated: the failure direction is
 * to ask for details, never to wave someone through.
 */
export async function isDocumentGated(fileUrl: string): Promise<boolean> {
  const url = (fileUrl || '').trim();
  if (!url) return true;

  try {
    const [blogs, resources, industries] = await Promise.all([
      prisma.blog.findMany({ select: { documents: true } }),
      prisma.resource.findMany({ select: { documents: true } }),
      prisma.industry.findMany({ select: { documents: true } }),
    ]);

    for (const row of [...blogs, ...resources, ...industries]) {
      for (const doc of toDocuments(row.documents)) {
        if (doc.url === url) return doc.gated;
      }
    }
    // attached to nothing we know about
    return true;
  } catch {
    return true;
  }
}
