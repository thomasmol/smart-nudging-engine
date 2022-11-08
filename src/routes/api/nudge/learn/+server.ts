import { PrismaClient, type Configuration, type Nudge, type Nudgee } from '@prisma/client';
import type { RequestHandler } from './$types';
const prisma = new PrismaClient();
import cron from 'node-cron';

export const POST: RequestHandler = async ({ request }) => {
	const { nudgeId } = await request.json();

	// get nudge
	const nudge: Nudge | null = await prisma.nudge.findFirst({ where: { id: nudgeId } });

	// get nudgee
	const nudgee: Nudgee | null = await prisma.nudgee.findFirst({ where: { id: nudge?.nudgee_id } });

	// get activities for nudgee between start and reaction time of nudge
	//const activities = await prisma.activity.findMany({ where: { nudgee_id: nudgee?.id, time: { gte: nudge?.start_time, lte: nudge?.reaction_time } } });

	// get activity goal contribution for activities
	/* const activityGoalContributions = await prisma.activity_goal_contribution.findMany({
		where: { activity_id: { in: activities.map((activity) => activity.id) } }
	}); */

    // train model

    // update nudgee model

    // trigger new nudge generation
    

	return new Response();
};
