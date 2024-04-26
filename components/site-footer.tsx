import React from "react";
import { siteConfig } from "@/config/site";

const SiteFooter = () => {
  return (
    <section className="border-t-[0.1px] border-muted p-4 sm:p-6">
      <div className="mx-auto max-w-6xl p-2">
        <p className="text-balance text-center text-sm text-muted-foreground sm:text-left">
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
      </div>
    </section>
  );
};

export default SiteFooter;
