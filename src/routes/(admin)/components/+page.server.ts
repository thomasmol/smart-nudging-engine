import type { ComponentType } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({fetch}) => {
	const response = await fetch('/api/components');
	const componentTypes: ComponentType[] = await response.json();
	return { componentTypes };
}) satisfies PageServerLoad;
