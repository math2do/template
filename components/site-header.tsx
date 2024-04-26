import { Terminal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/svg-icons";
import { siteConfig } from "@/config/site";
import ThemeToggler from "@/components/theme-toggler";
import { Separator } from "@/components/ui/separator";

const SiteHeader = () => {
  return (
    <section className="sticky top-0 w-full backdrop-blur-xl backdrop-opacity-100">
      <nav className="mx-auto flex max-w-full items-center  justify-between rounded-md p-2 md:max-w-[95%] lg:max-w-[90%]">
        <Link href="/">
          <div className="flex cursor-pointer items-end text-xl">
            <Terminal className="h-full w-full" />
            <h1 className="font-bold">
              <span className="text-primary">math</span>
              <span>2do</span>
            </h1>
          </div>
        </Link>

        <div className="flex items-center">
          <Button variant="ghost" size="icon">
            <a href={siteConfig.links.github}>
              <Icons.gitHub className="h-4 w-4" />
            </a>
          </Button>
          <ThemeToggler />
        </div>
      </nav>
      <Separator className="h-[0.1px] bg-muted" />
    </section>
  );
};

export default SiteHeader;
