import type { MDXComponents } from 'mdx/types';
import { customComponents } from './components/mdx-component';
import { MDXProvider } from '@mdx-js/react';

// For local approach, import is optional, if customComponents passes the components, else compulsory
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...customComponents,
    ...components,
  };
}
