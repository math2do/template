import React from 'react';
import GoOptmization from './go-optimization.mdx';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import MdxWrapper from '@/components/prose-wrapper';
import ThemeToggler from '@/components/theme-toggler';
import ExternalLink from '@/components/external-link';
import { CopyButton } from '@/components/copy-button';
import { cn } from '@/lib/utils';
import { LineElement } from 'rehype-pretty-code';
// new import
import { promises as fs } from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import { codeImport as remarkCodeImport } from 'remark-code-import';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerNotationDiff } from '@shikijs/transformers';
import remarkMdx from 'remark-mdx';
import { rehypePreProcess, rehypePostProcess } from '@/lib/mdx.mjs';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { LinkIcon } from 'lucide-react';
import SiteFooter from './site-footer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { getTableOfContents } from '@/lib/toc';
import Image from 'next/image';
import { ImageProps } from 'next/image';
import { DashboardTableOfContents } from './toc';

// You needn't have import components in mdx if file is for remotely rendered, since you're passing it here
// !! Order of CSS: rehype plugins -> prose-css -> these components below -> custom mdx.css
export const customComponents = {
  a: ({
    className,
    insideHeading,
    href,
    children,
    ...props
  }: React.HTMLAttributes<HTMLAnchorElement> & {
    insideHeading?: boolean;
    href?: string;
  }) => {
    if (insideHeading) {
      return (
        <Link
          className={cn(
            className,
            'group flex items-center gap-2 text-[1em] font-semibold text-foreground transition duration-300 hover:text-blue-400  hover:no-underline',
          )}
          href={href || '#'}
          {...props}
        >
          {children}
          <LinkIcon
            strokeWidth={1}
            className="hidden h-[0.7em] w-[0.7em] group-hover:inline-block"
          />
        </Link>
      );
    }
    return (
      <ExternalLink className={className} href={href || '#'} {...props}>
        {children}
      </ExternalLink>
    );
  },
  Link,
  pre: ({
    className,
    children,
    __rawString__,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & { __rawString__?: string }) => (
    <pre {...props} className={cn('relative', className)}>
      <CopyButton
        __rawString__={`${__rawString__ || ''}`}
        className="absolute right-1 top-0.5"
      />
      {children}
    </pre>
  ),
  Step: ({ className, ...props }: React.ComponentProps<'h3'>) => (
    <h3
      className={cn(
        'font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  Steps: ({ ...props }) => (
    <div
      className="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
      {...props}
    />
  ),

  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full border-collapse', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn('m-0 border-t p-0 even:bg-muted', className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      sizes="100vw"
      height={100}
      width={100}
      alt={alt || 'some image'}
      className={cn('h-auto w-full rounded-md', className)}
      {...(props as Omit<ImageProps, 'alt'>)}
    />
  ),
};

export default async function MDXComponent({ slug }: { slug: string }) {
  const mdxContent = await fs.readFile(
    process.cwd() + '/app/content/blog/go-optimization/go-optimization.mdx',
    'utf8',
  );

  const { content, frontmatter } = await compileMDX<{
    title: string;
    description: string;
  }>({
    source: mdxContent,
    components: customComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        format: 'mdx',
        remarkPlugins: [
          remarkMath,
          remarkParse,
          remarkMdx,
          remarkGfm,
          remarkToc,
          remarkCodeImport,
        ],
        rehypePlugins: [
          // TODO: Add the functionality of slug. It was removed because headings were becoming external link
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          rehypePreProcess,
          rehypeKatex,
          [
            rehypePrettyCode,
            {
              transformers: [transformerNotationDiff()],
              // theme: 'one-light', // checkout other themes here: https://shiki.style/themes
              theme: {
                dark: 'one-dark-pro',
                light: 'one-light',
              },
              keepBackground: false,
              tokensMap: {
                fn: 'entity.name.function', //check here : https://rehype-pretty.pages.dev/
                // get vs code entities name: https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide
              },
            },
          ],
          rehypePostProcess,
        ],
      },
    },
  });

  // TODO: Use the frontmatter
  // console.log('frontmatter', frontmatter);

  const toc = await getTableOfContents(mdxContent);

  return (
    <MaxWidthWrapper>
      <ThemeToggler />
      <DashboardTableOfContents toc={toc} />
      <MdxWrapper>{content}</MdxWrapper>
      <SiteFooter />
    </MaxWidthWrapper>
  );

  // Following will not return front_matter no not using it
  // return <MDXRemote {...source} components={components} />;
}
