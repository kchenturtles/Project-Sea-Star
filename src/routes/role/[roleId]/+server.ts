import { json } from "@sveltejs/kit";
import prismaClient from "$lib/database";

export const PATCH = async ({ request, params }) => {
    const roleId = parseInt(params.roleId);
    const { name, editTransactions, addTransactions, editProfiles, deleteUsers, resetPasswords } = await request.json()
    const role = await prismaClient.role.update({
        data: {
            name,
            editTransactions,
            addTransactions,
            editProfiles,
            deleteUsers,
            resetPasswords,
        },
        where: {
            id: roleId,
        },
    });
    return json(role, { status: 201 });
};

export const DELETE = async ({ params }) => {
    const roleId = parseInt(params.roleId);
    await prismaClient.role.delete({
        where: {
            id: roleId,
        },
    });
    return json({ success: true });
};