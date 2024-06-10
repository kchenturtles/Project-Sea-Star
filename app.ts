import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();

dotenv.config();

const app = express();

app.use(express.json());

app.get("/transactions/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const transactions = await prisma.transaction.findMany({
        where: {
            userId: userId,
        },
    });
    res.json(transactions);
});

app.post("/transactions/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const { amount, comment } = req.body;
    const user = await prisma.user.findUnique({
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
    }
    const transaction = await prisma.transaction.create({
        data: {
            amount,
            comment,
            userId,
            date: new Date(),
            causedById: 0,
        },
    });
    await prisma.user.update({
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

app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

app.post("/users", async (req, res) => {
    const { slackId, username } = req.body;
    const user = await prisma.user.create({
        data: {
            slackId,
            username,
            credits: 0,
            isSystem: false,
            
        },
    });
    res.json(user);
});

app.listen(3000, () => { console.log("Server is running on port 3000") });
