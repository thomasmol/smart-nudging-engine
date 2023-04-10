import prisma from '$lib/database';
import type { Prisma } from '@prisma/client';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({params, request}) => {
    const data = await request.json();
    const configuration_id = params.id;
    const nudgee_id = data.nudgee_id;
    const nudge_id = data.nudge_id;
    const effectiveness = data.effectiveness;

    const nudgeeWeights = await prisma.nudgeeWeights.findFirstOrThrow({
        where: {
            configuration_id,
            nudgee_id,
        }
    });
    const nudge = await prisma.nudge.findFirstOrThrow({
        where: {
            id: nudge_id
        },
        include: {
            UsedComponent: true
        }

    });


    // oldweights is a json array, which looks like this:
    // [
    //     {
    //         "component_value_id": "some uuid",
    //         "weight": 0.5
    //     }
    // ]
    const oldWeights = nudgeeWeights.weights as Prisma.JsonArray;

    // go through the old weights and update the weight for the component value based on effectiveness
    // newWeight must be float value between 0 and 1
    // effectiveness is a value between 0 and 1
    // oldWeight is a value between 0 and 1 and is the weight of the component value before the nudge
    const newWeights = oldWeights.map((weight) => {
        const weightObj = weight as Prisma.JsonObject;
        const component_value_id = weightObj.component_value_id as string;
        const oldWeight = weightObj.weight as number;
        const usedComponent = nudge.UsedComponent.find((usedComponent) => {
            return usedComponent.component_value_id === component_value_id;
        });
        if (usedComponent) {
            const newWeight = oldWeight + (1 - oldWeight) * effectiveness;
            return {
                component_value_id,
                weight: newWeight
            };
        } else {
            return {
                component_value_id,
                weight: oldWeight
            };
        }
    });


    await prisma.nudgeeWeights.update({
        where: {
            nudgee_id_configuration_id: {
                configuration_id,
                nudgee_id
            }
        },
        data: {
            weights: newWeights
        }
    });

    return new Response();
};