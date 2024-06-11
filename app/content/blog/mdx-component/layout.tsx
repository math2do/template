// TODO: create layout for your docs. E.g left navigation, right TOC
import MaxWidthWrapper from '@/components/max-width-wrapper';
import ThemeToggler from '@/components/theme-toggler';
import MdxWrapper from '@/components/prose-wrapper';

// such layout should be kept at top
export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <MaxWidthWrapper>
      <ThemeToggler />
      <MdxWrapper>{children}</MdxWrapper>
    </MaxWidthWrapper>
  );
}
