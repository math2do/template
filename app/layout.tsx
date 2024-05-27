import type { Metadata } from "next";
import {
  Inter,
  Roboto,
  Cantarell,
  Poppins,
  Ubuntu,
  Open_Sans,
} from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontOption = Open_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  icons: "/header-icon.svg",
  title: "Template App",
  description: "Template App for other projects",
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
          "min-w-[350px] font-sans antialiased",
          fontOption.className
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
