import type { Group } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
  const { id } = params;
  const response = await fetch(`/api/groups/${id}`);
  const group: Group = await response.json();
  return { group };
}) satisfies PageServerLoad;
