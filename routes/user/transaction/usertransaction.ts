import { Router, Request } from "express";
import prismaClient from "../../../services/database.js";

const router = Router({ mergeParams: true });

router.get("/", async (req: Request<{ userId: string }>, res) => {
    const userId = parseInt(req.params.userId);
    const user = await prismaClient.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            transactions: true,
        },
    });
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    res.json(user.transactions);
});

router.post("/", async (req: Request<{ userId: string }>, res) => {
    const userId = parseInt(req.params.userId);
    const { amount, comment } = req.body;
    const user = await prismaClient.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    if (user.isSystem) {
        res.status(403).json({ error: "System users cannot have transactions" });
        return;
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
    res.status(201).json(transaction);
});


export default router;