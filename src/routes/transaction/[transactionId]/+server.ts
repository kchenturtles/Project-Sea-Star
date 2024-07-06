import prismaClient from "$lib/database";
import { json, error } from "@sveltejs/kit";

export const GET = async ({ params }) => {
    const transactionId = parseInt(params.transactionId);
    const transaction = await prismaClient.transaction.findUnique({
        where: {
            id: transactionId,
        },
    });
    if (!transaction) {
        return error(404, "Transaction not found");
    }
    return json(transaction);
};

export const PATCH = async ({ params, request }) => {
    const transactionId = parseInt(params.transactionId);
    const { amount, comment } = await request.json();
    const transaction = await prismaClient.transaction.findUnique({
        where: {
            id: transactionId,
        },
    });
    if (!transaction) {
        return error(404, "Transaction not found");
    }
    await prismaClient.transaction.update({
        data: {
            amount,
            comment,
        },
        where: {
            id: transactionId,
        },
    });
    await prismaClient.user.update({
        data: {
            credits: {
                increment: amount - transaction.amount,
            },
        },
        where: {
            id: transaction.userId,
        },
    });
    return json({ success: true });
};

export const DELETE = async ({ params }) => {
    const transactionId = parseInt(params.transactionId);
    const transaction = await prismaClient.transaction.findUnique({
        where: {
            id: transactionId,
        },
    });
    if (!transaction) {
        return error(404, "Transaction not found");
    }
    await prismaClient.transaction.delete({
        where: {
            id: transactionId,
        },
    });
    await prismaClient.user.update({
        data: {
            credits: {
                decrement: transaction.amount,
            },
        },
        where: {
            id: transaction.userId,
        },
    });
    return json({ success: true });
};