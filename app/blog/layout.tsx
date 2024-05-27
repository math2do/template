import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const fontOption = Open_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  icons: "/header-icon.svg",
  title: "Bloging App",
  description: "bloging app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col bg-background font-sans antialiased",
        fontOption.className
      )}
    >
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
