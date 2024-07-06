import prismaClient from "$lib/database";
import { json } from "@sveltejs/kit";


export const GET = async () => {
    const users = await prismaClient.user.findMany();
    return json(users);
};

export const POST = async ({ request }) => {
    const { slackId, username } = await request.json();
    const user = await prismaClient.user.create({
        data: {
            slackId,
            username,
            credits: 0,
            isSystem: false,
        },
    });
    return json(user, { status: 201 });
};

