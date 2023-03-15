import prisma from '$lib/database';
import type { RequestHandler } from './$types';

export const POST = (async ({ params }) => {
  const nudge_id = params.id;
  const metric_type_id = params.m_type_id;

  const response = await prisma.nudgeMetric.create({
    data: {
      nudge_id,
      metric_type_id
    }
  });

  return new Response(JSON.stringify(response));
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
  const nudge_id = params.id;
  const metric_type_id = params.m_type_id;

  await prisma.nudgeMetric.delete({
    where: {
       nudge_id_metric_type_id: {
          nudge_id,
          metric_type_id
        }
    }
  });
  return new Response(JSON.stringify({success: true}));
}) satisfies RequestHandler;
