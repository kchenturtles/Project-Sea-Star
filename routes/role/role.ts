import { Router } from "express";
import prismaClient from "../../services/database.js";

const router = Router();

router.get("/", async (req, res) => {
    const roles = await prismaClient.role.findMany();
    res.json(roles);
});

router.post("/", async (req, res) => {
    const { name, editTransactions, addTransactions, editProfiles, deleteUsers, resetPasswords } = req.body;
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
    res.status(201).json(role);
});

router.patch("/:roleId", async (req, res) => {
    const roleId = parseInt(req.params.roleId);
    const { name, editTransactions, addTransactions, editProfiles, deleteUsers, resetPasswords} = req.body;
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
    res.status(201).json(role);
});

router.delete("/:roleId", async (req, res) => {
    const roleId = parseInt(req.params.roleId);
    await prismaClient.role.delete({
        where: {
            id: roleId,
        },
    });
    res.json({ success: true });
});

export default router;