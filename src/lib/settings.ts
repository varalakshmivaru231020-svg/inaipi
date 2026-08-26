import { prisma } from '@/lib/prisma';

/**
 * Generic key/value settings store (Prisma `Setting` table) used for site
 * configuration that admins edit: SMTP credentials, enquiry recipient, Google
 * Analytics id, etc. Values are always stored as strings.
 */

export async function getSettings(keys?: string[]): Promise<Record<string, string>> {
  try {
    const rows = keys?.length
      ? await prisma.setting.findMany({ where: { key: { in: keys } } })
      : await prisma.setting.findMany();
    return Object.fromEntries(rows.map(r => [r.key, r.value]));
  } catch {
    return {};
  }
}

export async function getSetting(key: string, fallback = ''): Promise<string> {
  const s = await getSettings([key]);
  return s[key] ?? fallback;
}

export async function setSettings(values: Record<string, unknown>): Promise<void> {
  for (const [key, v] of Object.entries(values)) {
    const value = String(v ?? '');
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
}

export type SmtpConfig = {
  host: string; port: number; secure: boolean;
  user: string; pass: string; from: string; to: string; enabled: boolean;
};

/** SMTP config with Microsoft Outlook / Office 365 defaults. */
export async function getSmtpConfig(): Promise<SmtpConfig> {
  const s = await getSettings([
    'smtp_host', 'smtp_port', 'smtp_secure', 'smtp_user', 'smtp_pass',
    'smtp_from', 'enquiry_to', 'smtp_enabled',
  ]);
  return {
    host: s.smtp_host || 'smtp.office365.com',
    port: Number(s.smtp_port || 587),
    // Office365 uses STARTTLS on 587 (secure=false); implicit TLS on 465 (secure=true)
    secure: s.smtp_secure === 'true' ? true : Number(s.smtp_port || 587) === 465,
    user: s.smtp_user || '',
    pass: s.smtp_pass || '',
    from: s.smtp_from || s.smtp_user || '',
    to: s.enquiry_to || s.smtp_user || '',
    enabled: s.smtp_enabled === 'true',
  };
}
