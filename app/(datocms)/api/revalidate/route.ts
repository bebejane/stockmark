import { locales, defaultLocale } from '@/i18n/routing';
import { buildRoute } from '@lib/routes';
import { revalidate } from 'next-dato-utils/route-handlers';

export const runtime = "edge"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {

  return await revalidate(req, async (payload, revalidate) => {

    const { api_key, entity } = payload;
    const { id, attributes } = entity

    const paths: string[] = []
    const path = await buildRoute(api_key, attributes, defaultLocale)
    //if (locale === defaultLocale)

    paths.push(path)
    locales.filter(l => l !== defaultLocale).forEach(l => {
      paths.push(`/${l}${path}`)
    })

    const tags: string[] = [api_key, id].filter(t => t)
    return await revalidate(paths, tags, true)
  })
}