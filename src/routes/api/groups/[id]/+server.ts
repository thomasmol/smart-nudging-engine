import type { RequestHandler } from './$types';
import type { Group } from '@prisma/client';
import prisma from '$lib/database';

export const GET = (async ({params}) => {
	const group: Group = await prisma.group.findFirstOrThrow({
    where: {
      id: params.id
    },
		include: {
			NudgeeGroup: true,
		}
	});
	return new Response(JSON.stringify(group));
}) satisfies RequestHandler;

export const PUT = (async ({ request, params }) => {
  const { name } = await request.json();
  if (!name) {
    throw new Error('Missing required params');
  }

  const group: Group = await prisma.group.update({
    where: {
      id: params.id
    },
    data: {
      name
    }
  });
  return new Response(JSON.stringify(group));
}) satisfies RequestHandler;