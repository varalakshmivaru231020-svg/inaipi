import Script from 'next/script';
import { getSetting } from '@/lib/settings';

/**
 * Injects the Google Analytics 4 tag when a Measurement ID is configured in the
 * admin panel (Setting key `ga_id`). Renders nothing when unset.
 */
export default async function GoogleAnalytics() {
  let gaId = '';
  try {
    gaId = (await getSetting('ga_id')).trim();
  } catch {
    gaId = '';
  }
  if (!/^G-[A-Z0-9]{6,}$/i.test(gaId)) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
      </Script>
    </>
  );
}
