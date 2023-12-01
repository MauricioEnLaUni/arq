import { PrismaClient } from "@prisma/client";
import hash from "../../../lib/infrastructure/encryption/hash.js";

export default async (req, res) => {
    const { id, status, cls, password, email } = req.body;
    const prisma = new PrismaClient();

    if (!id || (!cls && !password && !email)) {
        return res.status(400).send("Faltan campos.");
    }

    const original = await prisma.usuarios.findUnique({ where: { id } });
    if (!original) {
        return res.status(404).send("Usuario no encontrado");
    }

    if (email) {
        const emailIsUsed = await prisma.usuarios.findFirst({
            where: { email },
        });
        if (emailIsUsed) {
            return res.status(409).send("Email ya existe");
        }
    }

    const data = {
        cls: cls ?? original.cls,
        status: status ?? original.status,
        password: password ? await hash(password) : original.password,
        email: email ?? original.email,
    };
    await prisma.usuarios.update({ where: { id }, data });

    return res
        .status(204)
        .send(`El usuario ${original.nombre} ha sido modificado.`);
};
