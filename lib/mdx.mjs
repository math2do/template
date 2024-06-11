import createMDX from '@next/mdx'
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc';
import { codeImport as remarkCodeImport } from 'remark-code-import';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerNotationDiff } from '@shikijs/transformers';
import remarkMdx from 'remark-mdx';
import { visit } from 'unist-util-visit';

export const rehypePreProcess = () => (tree) => {
  visit(tree, (node) => {
    if (node?.type === 'element' && node?.tagName === 'pre') {
      const [codeEl] = node.children;
      if (codeEl.tagName !== 'code') {
        return;
      }
      node.__rawString__ = codeEl.children?.[0].value;
    }
  });
};

export const rehypePostProcess = () => (tree) => {
  visit(tree, (node) => {
    if (node?.type === 'element' && node?.tagName === 'figure') {
      const preElement =
        node.children.at(-1).tagName == 'figcaption'
          ? node.children.at(-2)
          : node.children.at(-1);
      if (preElement.tagName !== 'pre') {
        return;
      }
      preElement.properties['__rawString__'] = node.__rawString__;
    }
  });
};

//  For Local MDX files. Keep configuration comparable with remote-mdx.tsx
export const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkParse, remarkMdx, remarkGfm, remarkToc, remarkCodeImport],
    rehypePlugins: [
      // TODO: Add the functionality of slug. It was removed because headings were becoming external link
      // rehypeSlug,
      // [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      rehypePreProcess,
      [
        rehypePrettyCode,
        {
          transformers: [transformerNotationDiff()],
          theme: "one-light", // checkout other themes here: https://shiki.style/themes
          keepBackground: false,
          tokensMap: {
            fn: "entity.name.function", //check here : https://rehype-pretty.pages.dev/
            // get vs code entities name: https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide
          },
        },
      ],
      rehypePostProcess,
    ],
    format: "mdx"
  },
})
