import { PrismaClient, type Configuration, type Nudge, type Nudgee } from '@prisma/client';
const prisma = new PrismaClient();
import type { RequestHandler } from './$types';
import cron from "node-cron";

export const POST: RequestHandler = async ({request}) => {
    const { configurationId, nudgeeId } = await request.json();
    const configuration : Configuration | null = await prisma.configuration.findFirst({ where: { id: configurationId } });
    const nudgee : Nudgee | null= await prisma.nudgee.findFirst(/* { where: { id: nudgeeId } } */);
    console.log(configuration);
    console.log(nudgee?.activity_model);

    // get the highest ratings in the models
    const activityModel = nudgee?.activity_model;
    const categoryModel = nudgee?.nudge_category_model;
    const channelModel = nudgee?.nudge_channel_model;
    // get the highest ratings in the models

    // get components for the nudge

    // create the nudge

    // schedule the nudge

    // schedule the reaction to the nudge


    return new Response();
};

cron.schedule("*/5 * * * * *", () => {
    console.log("running a task every 5 seconds");
});
