import type { RequestHandler } from './$types';
import prisma from '$lib/database';

export const POST = (async ({ request, params }) => {
	const { nudgees } = await request.json();
  const group_id = params.id;
	if (!nudgees || !group_id) {
		throw new Error('Missing required params');
	}
  const nudgeeGroupData = nudgees.map((nudgeeId: string) => {
    return {
      nudgee_id: nudgeeId,
      group_id
    }
  });
  console.log(nudgeeGroupData);
	await prisma.nudgeeGroup.createMany({
		data: nudgeeGroupData,
    skipDuplicates: true
	});
	return new Response(JSON.stringify({success:true}));
}) satisfies RequestHandler;
