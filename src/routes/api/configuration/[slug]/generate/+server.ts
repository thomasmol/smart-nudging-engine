import { PrismaClient, type Nudge } from '@prisma/client';
const prisma = new PrismaClient();

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const configuration = await prisma.configuration.findFirst({ where: { id: url.params } });
	const timeframes = await prisma.timeframe.findMany();
	const categories = await prisma.category.findMany();
	const channels = await prisma.channel.findMany();
	const activityTypes = await prisma.activityType.findMany();
	const nudgee = await prisma.nudgee.findFirst();

	const timeframe = timeframes[Math.floor(Math.random() * timeframes.length)];
	const category = categories[Math.floor(Math.random() * categories.length)];
	const channel = channels[Math.floor(Math.random() * channels.length)];
	const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];


  const presentDatetime = new Date(timeframe.start_time)
  presentDatetime.setSeconds(timeframe.start_time.getSeconds() + 123);

	const nudge : Nudge = await prisma.nudge.create({
		data: {
			nudgee_id: nudgee?.id,
			activity_type_id: activityType.id,
			category_id: category.id,
			channel_id: channel.id,
			timeframe_id: timeframe.id,
			configuration_id: configuration?.id,
			effectiveness: 0,
			present_datetime: timeframe.start_time,
			reaction_wait_datetime: presentDatetime
		}
	});

	if (nudge) {
		return new Response(JSON.stringify(nudge));
	}
}
