import type { MetadataRoute } from "next";
import { getAllSets } from "@/lib/sets";

const SITE_URL = "https://pack-house-pink.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sets = getAllSets();
  const setUrls: MetadataRoute.Sitemap = sets.flatMap((s) => [
    {
      url: `${SITE_URL}/sets/${s.code}?edition=JP`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sets/${s.code}?edition=KR`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    },
  ]);

  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: `${SITE_URL}/products/mega-dream-ex`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    ...setUrls,
  ];
}
