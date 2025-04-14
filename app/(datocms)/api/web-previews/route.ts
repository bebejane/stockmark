import { NextRequest } from 'next/server';
import { webPreviews, cors } from 'next-dato-utils/route-handlers';
import { buildRoute } from '@lib/routes';

export const runtime = "edge"

export async function POST(req: NextRequest) {

  return await webPreviews(req, async ({ item, itemType, locale }) => {
    const paths = await buildRoute(itemType.attributes.api_key, item.attributes, locale)
    return paths?.[0]
  })
}

export async function OPTIONS(req: Request) {
  return await cors(req, new Response('ok', { status: 200 }), {
    origin: '*',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false
  })
}