import { PrismaClient } from "@prisma/client";

export default async (req, res) => {
    const { id } = req.id;
    const prisma = new PrismaClient();

    try {
        await prisma.usuarios.delete({
            where: { id },
        });

        return res.status(204).send(`Usuario eliminado: ${id}`);
    } catch (error) {
        return res.status(404).send("Usuario no encontrado.");
    }
};
