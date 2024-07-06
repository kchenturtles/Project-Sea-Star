import prismaClient from "$lib/database";
import { error, json } from "@sveltejs/kit";

export const GET = async ({ params }) => {
    const userId = parseInt(params.userId);
    const user = await prismaClient.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            transactions: {
                orderBy: {
                    date: "asc",
                },
            },
        },
    });
    if (!user) {
        return error(404, "User not found");
    }
    return json(user.transactions);
};

export const POST = async ({ params, request }) => {
    const userId = parseInt(params.userId);
    const { amount, comment } = await request.json();
    const user = await prismaClient.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        return error(404, "User not found");
    }
    if (user.isSystem) {
        return error(403, "System users cannot have transactions");
    }
    const transaction = await prismaClient.transaction.create({
        data: {
            amount,
            comment,
            user: {
                connect: {
                    id: userId,
                },
            },
            date: new Date(),
            causedBy: {
                connect: {
                    id: 1,
                },
            }
        },
    });
    await prismaClient.user.update({
        data: {
            credits: {
                increment: amount,
            },
        },
        where: {
            id: userId,
        },
    });
    json(transaction, { status: 201 });
};