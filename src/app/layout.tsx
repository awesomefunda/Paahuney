import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Paahuney — Activities & Resources for Visiting Parents',
  description:
    'Helping immigrant families show their visiting parents the best of the Bay Area. Find temples, parks, senior groups, and connect with other families.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm mt-12">
          <p>Made with ❤️ for immigrant families · Bay Area MVP</p>
          <p className="mt-1">
            <a href="/resources" className="underline hover:text-white">Resources</a>
            {' · '}
            <a href="/community" className="underline hover:text-white">Community</a>
            {' · '}
            <a href="/activities" className="underline hover:text-white">Activities</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
