import { locales, defaultLocale } from '@/i18n/routing';
import { buildRoute } from '@lib/routes';
import { sleep } from 'next-dato-utils/utils';
import { revalidate } from 'next-dato-utils/route-handlers';

export const runtime = "edge"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  return await revalidate(req, async (payload, revalidate) => {
    const { api_key, entity } = payload;
    const { id, attributes } = entity

    const paths = await buildRoute(api_key, attributes, defaultLocale)
    paths?.forEach(p => {
      locales.forEach(l => paths.push(`/${l}${p !== '/' ? p : ''}`))
    })

    const tags: string[] = [api_key, id].filter(t => t)
    await sleep(3000)
    return await revalidate(paths, tags, true)
  })
}