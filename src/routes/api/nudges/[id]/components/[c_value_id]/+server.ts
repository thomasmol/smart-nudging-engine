import prisma from '$lib/database';
import type { RequestHandler } from './$types';

export const POST = (async ({ params }) => {
  const nudge_id = params.id;
  const component_value_id = params.c_value_id;

  const response = await prisma.usedComponent.create({
    data: {
      nudge_id,
      component_value_id
    }
  });

  return new Response(JSON.stringify(response));
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
  const nudge_id = params.id;
  const component_value_id = params.c_value_id;

  await prisma.usedComponent.delete({
    where: {
       nudge_id_component_value_id: {
          nudge_id,
          component_value_id
        }
    }
  });
  return new Response(JSON.stringify({success: true}));
}) satisfies RequestHandler;
