import React from 'react';
import { siteConfig } from '@/config/site';
import ExternalLink from './external-link';
import MaxWidthWrapper from './max-width-wrapper';

const SiteFooter = () => {
  return (
    <footer className="h-16 border-t-[0.1px] border-muted">
      <MaxWidthWrapper className="flex h-full items-center">
        <p className="text-balance text-center text-sm leading-6 text-muted-foreground sm:text-left">
          Built by{' '}
          <a
            href={siteConfig.links.portFolio}
            className="text-foreground  underline underline-offset-4"
          >
            math2do
          </a>{' '}
          using NEXT.js. Source code is available on{' '}
          <ExternalLink href={siteConfig.links.github}>Github</ExternalLink>
        </p>
      </MaxWidthWrapper>
    </footer>
  );
};

export default SiteFooter;
