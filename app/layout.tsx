import type { Metadata } from 'next';
import { fontSans, fontMono } from '@/lib/fonts';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  icons: '/header-icon.svg',
  title: 'Template App',
  description: 'Template App for other projects',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-w-[350px] antialiased',
          fontSans.className,
          fontMono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
