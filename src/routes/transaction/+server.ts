import prismaClient from "$lib/database";
import { json } from "@sveltejs/kit";

export const GET = async () => {
    const transactions = await prismaClient.transaction.findMany({
        orderBy: { date: "asc" },
    });
    return json(transactions);
};
