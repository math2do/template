import React from 'react';
import GoOptmization from './go-optimization.mdx';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import MdxWrapper from '@/components/prose-wrapper';
import ThemeToggler from '@/components/theme-toggler';
import MDXComponent from '@/components/mdx-component';

export default async function Page() {
  // 1. With Remote Approach
  return <MDXComponent slug="" />;

  // 2. Local Approach with import
  // return (
  //   <MaxWidthWrapper>
  //     <ThemeToggler />
  //     <MdxWrapper>
  //       <GoOptmization />
  //     </MdxWrapper>
  //   </MaxWidthWrapper>
  // );
}
