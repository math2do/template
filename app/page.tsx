import MaxWidthWrapper from "@/components/max-width-wrapper";
import Link from "next/link";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <ul className="space-y-4">
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/blog">Testing</Link>
        </li>
      </ul>
    </MaxWidthWrapper>
  );
}
