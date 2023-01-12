import { PrismaClient, type ComponentType } from '@prisma/client';
import type { RequestHandler } from './$types';

const prisma = new PrismaClient();

export const GET = (async ({ params }) => {
	const componentType : ComponentType = await prisma.componentType.findFirstOrThrow({
		where: { id: params.id }
	});
	return new Response(JSON.stringify(componentType));
}) satisfies RequestHandler;
