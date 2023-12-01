import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export default async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.["74f913380c62fc3c08755a33f9457a58"]) {
        return res.sendStatus(401);
    }
    const refresh = cookies["74f913380c62fc3c08755a33f9457a58"];

    const prisma = new PrismaClient();
    const user = await prisma.token.findUnique({
        where: { content: refresh },
    });
    if (!user) {
        return res.sendStatus(403);
    }

    jwt.verify(refresh, process.env.REFRESH_TOKEN, (err, decoded) => {
        if (err || user.owner !== decoded.id) {
            return res.sendStatus(403);
        }
        const access = jwt.sign(
            {
                id: user.owner,
                nombre: decoded.nombre,
            },
            process.env.ACCES_TOKEN,
            { expiresIn: "15m" },
        );
        return res.json({ accessToken: access });
    });
};
