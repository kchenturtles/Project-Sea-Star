import { Router } from "express";
import prismaClient from "../../services/database.js";

import transactionRouter from "./transaction/usertransaction.js";

const router = Router();

router.use("/:userId/transaction", transactionRouter);

router.get("/", async (req, res) => {
    const users = await prismaClient.user.findMany();
    res.json(users);
});

router.get("/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = await prismaClient.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    res.json(user);
});

router.post("/", async (req, res) => {
    const { slackId, username } = req.body;
    const user = await prismaClient.user.create({
        data: {
            slackId,
            username,
            credits: 0,
            isSystem: false,
        },
    });
    res.status(201).json(user);
});

router.patch("/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const { credits, slackId, username, roleId } = req.body;
    const user = await prismaClient.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    await prismaClient.user.update({
        data: {
            credits,
            slackId,
            username,
            role: roleId && {
                connect: {
                    id: roleId,
                },
            }
        },
        where: {
            id: userId,
        },
    });
    res.json({ success: true });
});

router.delete("/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = await prismaClient.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    await prismaClient.user.delete({
        where: {
            id: userId,
        },
    });
    res.json({ success: true });
});

export default router;