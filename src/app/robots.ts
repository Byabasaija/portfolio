import type { MetadataRoute } from "next";
import config from "@/config";

const { siteURL } = config;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${siteURL}/sitemap.xml`,
    host: siteURL,
  };
}
