import { PrismaClient, type ComponentValue } from '@prisma/client';
import type { RequestHandler } from './$types';

const prisma = new PrismaClient();

export const GET = (async ({ params }) => {
	const compontentValues: ComponentValue[] = await prisma.componentValue.findMany({
		where: { component_type_id: params.id }
	});
	return new Response(JSON.stringify(compontentValues));
}) satisfies RequestHandler;
