import React from 'react';
import { cn } from '@/lib/utils';

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <section
      className={cn(
        'mx-auto max-w-full md:max-w-[98%] lg:max-w-[98%] min-[1600px]:max-w-[1600px]',
        className,
      )}
    >
      {children}
    </section>
  );
};

export default MaxWidthWrapper;
