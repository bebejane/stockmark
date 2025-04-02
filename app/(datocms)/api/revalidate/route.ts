import { locales } from '@/i18n/routing';
import { buildRoute } from '@lib/routes';
import { revalidate } from 'next-dato-utils/route-handlers';

export const runtime = "edge"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {

  return await revalidate(req, async (payload, revalidate) => {

    const { api_key, entity, } = payload;
    const { id, attributes } = entity

    const paths: string[] = []
    for (const locale of locales)
      paths.push(await buildRoute(api_key, attributes, locale))

    const tags: string[] = [api_key, id].filter(t => t)
    return await revalidate(paths, tags, true)
  })
}