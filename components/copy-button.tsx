'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { CopyIcon, CheckIcon } from 'lucide-react';

export function CopyButton({
  __rawString__,
  className,
}: React.HTMLAttributes<HTMLPreElement> & { __rawString__: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(__rawString__);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <Button
      className={cn(className, 'copy-button p-1.5')}
      variant="ghost"
      size="sm"
      onClick={copy}
    >
      <Icon height={16} width={16} className="text-muted-foreground" />
    </Button>
  );
}
