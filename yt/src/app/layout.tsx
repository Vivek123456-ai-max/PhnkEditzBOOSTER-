import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PhnkEditz YT Booster | YouTube Shorts SEO & Metadata Generator',
  description:
    'Generate viral YouTube Shorts titles, high-retention descriptions, 500-char tag clouds, and trending hashtags for Phonk, Drift, and Music creators.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-phonk-bg text-zinc-100 antialiased selection:bg-phonk-accent selection:text-white">
        <div className="fixed inset-0 bg-phonk-glow pointer-events-none z-0" />
        <div className="fixed inset-0 bg-purple-glow pointer-events-none z-0" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
