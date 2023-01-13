import type { RequestHandler } from './$types';

export const GET = (({ url }) => {

    return new Response()
}) satisfies RequestHandler;



export const POST = ( async ({ request }) => {
    const { body } = request;
    return new Response()
}) satisfies RequestHandler;
