import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/store/appStore';
import { SearchModal } from '@/components/ui/SearchModal';

export const metadata: Metadata = {
  title: 'Thunder Rocket 138/10R | Official Cricket Team & Management System',
  description:
    'Official digital platform of the Thunder Rocket 138/10R Cricket Franchise. Live scores, playing XI, squad stats, coaching staff, high-performance training, and club management.',
  keywords: 'Thunder Rocket 138/10R, 138/10R, cricket, cricket team, cricket management, live cricket score, PSL, Pakistan cricket, playing XI',
  openGraph: {
    title: 'Thunder Rocket 138/10R | Strike Like Thunder • Soar Like a Rocket',
    description: 'Official franchise platform for Thunder Rocket 138/10R cricket team.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#F6FBFC] text-slate-800 antialiased selection:bg-[#00B4D8] selection:text-white">
        <AppProvider>
          {children}
          <SearchModal />
        </AppProvider>
      </body>
    </html>
  );
}
