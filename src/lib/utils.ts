import type { Role, User } from '@prisma/client';
import prismaClient from './database';

export const hasPermission = async (
	user: User,
	permission: keyof Omit<Role, 'id' | 'name'>
): Promise<boolean> => {
	const roleId = user.roleId;
	if (!roleId) return false;
	return (
		(
			await prismaClient.role.findUnique({ where: { id: roleId }, include: { [permission]: true } })
		)?.[permission] ?? false
	);
};

// Perform an audit of the user's credits and make sure the transactions add up
export const creditsValid = async (user: User): Promise<boolean> => {
    const transactions = await prismaClient.transaction.aggregate({
        where: { userId: user.id },
        _sum: { amount: true },
    });
    return transactions._sum.amount === user.credits;
};
