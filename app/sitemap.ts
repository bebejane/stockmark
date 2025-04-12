import { MetadataRoute } from 'next'
import { getPathname, AppPathnames } from "@/i18n/routing"

// Define the canonical paths that should be included
const canonicalPaths: AppPathnames[] = ['/', '/manifest', '/om-dig', '/om-oss', '/portfolj', '/kontakt']

// Generate both default locale and 'en' locale paths
const allPaths: string[] = [
  ...canonicalPaths, // Add default locale paths (assuming they are the canonical ones)
  ...canonicalPaths.map(href => getPathname({ locale: 'en', href })) // Add 'en' locale paths
];

const staticRoutes = [
  ...allPaths.map((route) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  }))
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const sitemap = [
    ...staticRoutes,
  ]

  return sitemap as MetadataRoute.Sitemap
}
