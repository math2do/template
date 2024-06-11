import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import {
  Inter,
  Roboto,
  Cantarell,
  Poppins,
  Ubuntu,
  Open_Sans,
  Source_Code_Pro,
} from 'next/font/google';

export const openSans = Open_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export const fontMono = GeistMono;
export const fontSans = GeistSans;
