import { buildRoute } from '@lib/routes';
import { revalidate } from 'next-dato-utils/route-handlers';

export const runtime = "edge"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {

  return await revalidate(req, async (payload, revalidate) => {

    const { api_key, entity } = payload;
    const { id, attributes: { slug } } = entity
    const path = await buildRoute(api_key, entity.attributes)
    const paths: string[] = [path]
    const tags: string[] = [api_key, id].filter(t => t)
    return await revalidate(paths, tags, true)
  })
}