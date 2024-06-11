import { Router } from "express";
import prismaClient from "../services/database.js";

const router = Router();

router.get("/:userId", async (req, res) => {
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

router.post("/:userId", async (req, res) => {
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
            userId,
            date: new Date(),
            causedById: 0,
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

router.patch("/:transactionId", async (req, res) => {
    const transactionId = parseInt(req.params.transactionId);
    const { amount, comment } = req.body;
    const transaction = await prismaClient.transaction.findUnique({
        where: {
            id: transactionId,
        },
    });
    if (!transaction) {
        res.status(404).json({ error: "Transaction not found" });
        return;
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
    res.json({ success: true });
});

router.delete("/:transactionId", async (req, res) => {
    const transactionId = parseInt(req.params.transactionId);
    const transaction = await prismaClient.transaction.findUnique({
        where: {
            id: transactionId,
        },
    });
    if (!transaction) {
        res.status(404).json({ error: "Transaction not found" });
        return;
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
    res.json({ success: true });
});

export default router;