import { PrismaClient } from "@prisma/client";

export default async (_, res) => {
    const prisma = new PrismaClient();

    const results = await prisma.usuarios.findMany();

    return res.status(200).json(results).send();
};
