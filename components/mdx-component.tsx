import React from 'react';
import GoOptmization from './go-optimization.mdx';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import MdxWrapper from '@/components/prose-wrapper';
import ThemeToggler from '@/components/theme-toggler';
import ExternalLink from '@/components/external-link';
import Hello from '@/components/hello';
import { CopyButton } from '@/components/copy-button';
import { cn } from '@/lib/utils';

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

// You needn't have import components in mdx if file is for remotely rendered, since you're passing it here
// !! Order of CSS: rehype plugins -> prose-css -> tailwind typography extend -> these components below
export const customComponents = {
  a: ExternalLink,
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
          remarkParse,
          remarkMdx,
          remarkGfm,
          remarkToc,
          remarkCodeImport,
        ],
        rehypePlugins: [
          // TODO: Add the functionality of slug. It was removed because headings were becoming external link
          // rehypeSlug,
          // [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          rehypePreProcess,
          [
            rehypePrettyCode,
            {
              transformers: [transformerNotationDiff()],
              theme: 'one-light', // checkout other themes here: https://shiki.style/themes
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

  return (
    <MaxWidthWrapper>
      <ThemeToggler />
      <MdxWrapper>{content}</MdxWrapper>
      <SiteFooter />
    </MaxWidthWrapper>
  );

  // Following will not return front_matter no not using it
  // return <MDXRemote {...source} components={components} />;
}
