import { Router } from "express";
import prismaClient from "../../services/database.js";

const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
    const transactions = await prismaClient.transaction.findMany({
        orderBy: { date: "asc" },
    });
    res.json(transactions);
});

router.get("/:transactionId", async (req, res) => {
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
    res.json(transaction);
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
