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
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';


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
    // passing props __rawString__ for copy button
    // figure is the parent of pre, since parent can pass props to children later in postProcess
    if (node?.type === 'element' && node?.tagName === 'figure') {
      const preElement =
        node.children.at(-1).tagName == 'figcaption'
          ? node.children.at(-2)
          : node.children.at(-1);
      if (preElement.tagName !== 'pre') {
        return;
      }

      // remove the lines with comment [!code --], also remove comment [!code ++]
      let __rawString__ = node.__rawString__
      __rawString__ = __rawString__.split("\n")
        .filter((line) => {
          return !line.includes("[!code --]")
        }).map((line) => {
          if (line.includes("[!code ++]")) {
            return line.replace("[!code ++]", "")
          }
          return line
        }).join("\n")

      preElement.properties['__rawString__'] = __rawString__;
    }

    // pass insideHeading props so that, external link style is not added to headings
    if (node?.type === 'element' && (node?.tagName === 'h1' || node?.tagName === 'h2' || node?.tagName === 'h3' || node?.tagName === 'h4' || node?.tagName === 'h5' || node?.tagName === 'h6')) {
      const aElement = node.children[0];
      if (aElement.tagName !== 'a') {
        return;
      }
      aElement.properties['insideHeading'] = true;
    }

    // adding line number to data line inside, pre -> code -> span
    if (node?.type === 'element' && node?.tagName === 'pre') {
      const code = node.children[0];

      // showLineNumbers shoud be added to show line numbers. which adds attributes data-line-numbers-max-digits
      if (!("data-line-numbers-max-digits" in code.properties)) {
        return
      }

      let addLine = 0;
      let removeLine = 0;
      let removed = false;

      code.children.forEach((span) => {
        if (span.properties) {
          let currentLine = 0;
          if (span.properties.className && span.properties.className.includes("remove")) {
            // Case: Remove Lines
            removed = true;
            removeLine++;
            currentLine = removeLine;
          } else if (span.properties.className && span.properties.className.includes("add")) {
            if (removed) {
              // something was removed, on top of which new lines are added, case: Remove old + Add New Lines
              addLine++;
              removeLine = addLine;
              currentLine = addLine;
            } else {
              // nothing was removed before, new lines are added. case: New Line Added
              removed = false;
              addLine++;
              removeLine++;
              currentLine = addLine;
            }
          } else {
            if (removed) {
              addLine = removeLine;
              addLine++;
              removeLine++;
            } else {
              addLine++;
              removeLine++;
            }
            removed = false;
            currentLine = addLine;
          }

          if ("data-line" in span.properties) {
            span.children = [{
              type: 'element',
              tagName: 'span',
              properties: { className: ["line_number"] },
              children: [{ type: 'text', value: currentLine.toString() }]
            }, ...span.children]
          }
        }
      })
    }
  });
};

//  For Local MDX files. Keep configuration comparable with remote-mdx.tsx
export const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkMath, remarkParse, remarkMdx, remarkGfm, remarkToc, remarkCodeImport],
    rehypePlugins: [
      // TODO: Add the functionality of slug. It was removed because headings were becoming external link
      // rehypeSlug,
      // [rehypeAutolinkHeadings, { behavior: 'wrap' }],
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
