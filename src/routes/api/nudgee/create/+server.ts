import { PrismaClient, type Nudgee } from '@prisma/client';
import type { RequestHandler } from './$types';
const prisma = new PrismaClient();

export const GET: RequestHandler = async ({request}) => {
    const {nudgee  } = await request.json();
    
    const response : Nudgee | null = await prisma.nudgee.create({
        data: {
            activity_model: nudgee.activity_model,
            nudge_category_model: nudgee.nudge_category_model,
            nudge_channel_model: nudgee.nudge_channel_model,
        }

    });

    return new Response();
};