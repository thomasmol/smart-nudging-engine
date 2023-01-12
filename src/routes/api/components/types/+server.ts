import type { RequestHandler } from './$types';
import { PrismaClient, type ComponentType } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = (async () => {
	const compontentTypes: ComponentType[] = await prisma.componentType.findMany();
	return new Response(JSON.stringify(compontentTypes));
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	console.log( request);

  const {label, dataType} = await request.json();
  if (!label || !dataType) {
    throw new Error('Missing required params');
  }

	const componentType: ComponentType = await prisma.componentType.create({
		data: {
			label: label,
      data_type: dataType,
		}
	});
	return new Response(JSON.stringify(componentType));
}) satisfies RequestHandler;
