import { PrismaClient } from "@prisma/client";

export default async (req, res) => {
    const { id } = req.body;
    const prisma = new PrismaClient();

    const result = await prisma.usuarios.findUnique({
        where: { id },
    });

    return res.status(200).json(result).send();
};
