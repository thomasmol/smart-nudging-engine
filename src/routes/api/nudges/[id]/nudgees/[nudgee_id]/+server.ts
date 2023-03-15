import prisma from '$lib/database';
import type { RequestHandler } from './$types';

export const POST = (async ({ params }) => {
  const nudge_id = params.id;
  const nudgee_id = params.nudgee_id;

  const response = await prisma.nudgeRecipient.create({
    data: {
      nudge_id,
      nudgee_id
    }
  });

  return new Response(JSON.stringify(response));
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
  const nudge_id = params.id;
  const nudgee_id = params.nudgee_id;

  await prisma.nudgeRecipient.delete({
    where: {
       nudge_id_nudgee_id: {
          nudge_id,
          nudgee_id
        }
    }
  });
  return new Response(JSON.stringify({success: true}));
}) satisfies RequestHandler;
