import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/db/v1/post";
import { getPortfolioPosts } from "@/lib/db/v1/portfolio";
import config from "@/config";

const { siteURL } = config;

function mapPostsToSitemap(
  posts: { metadata: { publishedAt: string }; slug: string }[],
  prefix: string,
) {
  return posts.map((post) => ({
    url: `${siteURL}/${prefix}/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogs = await getBlogPosts();
  let blogMaps = mapPostsToSitemap(blogs, "post");

  let portfolios = await getPortfolioPosts();
  let portfolioMaps = mapPostsToSitemap(portfolios, "portfolio");

  let routes = ["", "/resume", "/portfolio", "/post", "/gallery"].map(
    (route) => ({
      url: `${siteURL}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    }),
  );

  return [...routes, ...blogMaps, ...portfolioMaps];
}
