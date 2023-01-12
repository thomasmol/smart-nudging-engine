import type { ComponentType } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const response = await fetch('http://localhost:5173/api/components/types');
	const componentTypes: ComponentType[] = await response.json();
	return { componentTypes };
}) satisfies PageServerLoad;
