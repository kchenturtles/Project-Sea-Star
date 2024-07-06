import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import prismaClient from "$lib/database";

export const GET: RequestHandler = async () => {
    const roles = await prismaClient.role.findMany();
    return json(roles);
};

export const POST: RequestHandler = async ({ request }) => {
    const { name, editTransactions, addTransactions, editProfiles, deleteUsers, resetPasswords } = await request.json();
    const role = await prismaClient.role.create({
        data: {
            name,
            editTransactions,
            addTransactions,
            editProfiles,
            deleteUsers,
            resetPasswords,
        },
    });
    return json(role, { status: 201 });
};
