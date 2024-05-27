import React from "react";
import { siteConfig } from "@/config/site";
import MaxWidthWrapper from "./max-width-wrapper";

const SiteFooter = () => {
  return (
    <section className="border-t-[0.1px] border-muted py-4 sm:py-6">
      <MaxWidthWrapper>
        <p className="text-balance text-center text-sm leading-6 text-muted-foreground sm:text-left">
          Built by{" "}
          <a
            href={siteConfig.links.portFolio}
            className="text-foreground  underline underline-offset-4"
          >
            math2do
          </a>{" "}
          using NEXT.js. Source code is available on{" "}
          <a
            href={siteConfig.links.github}
            className="text-foreground underline underline-offset-4"
          >
            Github
          </a>
        </p>
      </MaxWidthWrapper>
    </section>
  );
};

export default SiteFooter;
