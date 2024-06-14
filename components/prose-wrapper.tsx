import React from 'react';
import { cn } from '@/lib/utils';
import '../styles/mdx.css';

export default function ProseWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      // These prose utilities will be added all matching element. i.e For specifically targetting see how typography is extended in tailwind.config.ts
      className={cn(
        'prose mt-3 max-w-none dark:prose-invert',
        'prose-a:no-underline',
        'prose-headings:scroll-m-16 prose-headings:capitalize',
        'prose-code:not-prose prose-code:rounded prose-code:border prose-code:font-normal prose-code:before:content-[""] prose-code:after:content-[""]',
        'prose-pre:bg-background prose-pre:p-0',
        'mdx',
      )}
    >
      {children}
    </main>
  );
}
