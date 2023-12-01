import { PrismaClient } from "@prisma/client";
import hash from "../../../lib/infrastructure/encryption/hash.js";

export default async (req, res) => {
    const { nombre, password, email } = req.body;

    if (!password || password.length < 4 || password.length > 255) {
        return res.status(400).send("Contraseña inadecuada");
    }
    if (!email || email.length < 5 || email.length > 96) {
        return res.status(400).send("El email está incorrecto");
    }
    if (!nombre || nombre.length > 16 || nombre.length < 3) {
        return res.status(400).send("Email incorrecto.");
    }

    const prisma = new PrismaClient();

    const result = await prisma.usuarios.findUnique({
        where: {
            nombre,
        },
    });
    if (result) {
        return res.status(409).send("El usuario ya existe");
    }

    const em = await prisma.usuarios.findUnique({
        where: {
            email,
        },
    });
    if (em) {
        return res.status(409).send("El email está en uso.");
    }
    const pwd = (await hash(password)) as string;
    const newUser = await prisma.usuarios.create({
        data: {
            nombre,
            password: pwd,
            email,
            status: "ACTIVE",
            party: {
                create: {

                }
            },
        },
    });

    return res.status(201).json({
        id: newUser.id.toString(),
        nombre: newUser.nombre,
    });
};
