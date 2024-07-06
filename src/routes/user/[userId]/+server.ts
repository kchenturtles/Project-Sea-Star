import prismaClient from "$lib/database";
import { error, json } from "@sveltejs/kit";

export const GET = async ({ params }) => {
    const userId = parseInt(params.userId);
    const user = await prismaClient.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        return error(404, "User not found");
    }
    return json(user);
};

export const PATCH = async ({ request, params }) => {
    const userId = parseInt(params.userId);
    const { credits, slackId, username, roleId } = await request.json();
    const user = await prismaClient.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        return error(404, "User not found");
    }
    await prismaClient.user.update({
        data: {
            credits,
            slackId,
            username,
            role: roleId && {
                connect: {
                    id: roleId,
                },
            }
        },
        where: {
            id: userId,
        },
    });
    return json({ success: true });
};

export const DELETE = async({ params }) => {
    const userId = parseInt(params.userId);
    const user = await prismaClient.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        return error(404, "User not found");
    }
    await prismaClient.user.delete({
        where: {
            id: userId,
        },
    });
    return json({ success: true });
};