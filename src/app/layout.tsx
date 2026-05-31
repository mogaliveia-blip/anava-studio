import type {Metadata} from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { StructuredData } from '@/components/seo/StructuredData';
import { absoluteUrl, seoConfig } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description:
    'Anava Studio conçoit des applications web, outils métiers et solutions numériques sur mesure pour les entreprises, indépendants et organisations.',
  applicationName: seoConfig.siteName,
  authors: [{ name: seoConfig.siteName }],
  creator: seoConfig.siteName,
  publisher: seoConfig.siteName,
  keywords: [...seoConfig.keywords],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: seoConfig.locale,
    siteName: seoConfig.siteName,
    url: seoConfig.siteUrl,
    title: seoConfig.defaultTitle,
    description:
      'Anava Studio conçoit des applications web, outils métiers et solutions numériques sur mesure pour les entreprises, indépendants et organisations.',
    images: [seoConfig.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.defaultTitle,
    description:
      'Anava Studio conçoit des applications web, outils métiers et solutions numériques sur mesure pour les entreprises, indépendants et organisations.',
    images: [seoConfig.ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleTagId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
  const configuredGoogleIds = [
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
  ].filter(Boolean)

  return (
    <html lang="fr">
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.variable} font-body antialiased selection:bg-accent/30`}>
        {googleTagId && (
          <>
            <Script
              src={absoluteUrl(`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`)}
              strategy="afterInteractive"
            />
            <Script id="google-tag-manager" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                ${configuredGoogleIds.map((id) => `gtag('config', '${id}');`).join('\n')}
              `}
            </Script>
          </>
        )}
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
