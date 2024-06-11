import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

export default function ExternalLink({
  href,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLAnchorElement> & { href?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      className={cn(
        'relative inline-block pr-4 text-blue-500 transition-all hover:text-blue-400 hover:underline hover:underline-offset-4',
        className,
      )}
      {...props}
    >
      {children}
      <ArrowUpRight
        className="absolute inline-block h-[14px] w-[14px] translate-y-1/3"
        height={15}
      />
    </a>
  );
}
