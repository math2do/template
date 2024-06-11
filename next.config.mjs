import { withMDX } from './lib/mdx.mjs';
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}

// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig)
