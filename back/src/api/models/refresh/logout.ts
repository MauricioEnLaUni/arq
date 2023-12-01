import { PrismaClient } from "@prisma/client";

export default async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }

    const refresh = cookies.jwt;
    const prisma = new PrismaClient();
    const exists = await prisma.token.findUnique({
        where: { content: refresh, active: true },
    });

    if (!exists) {
        res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.sendStatus(204);
    }

    await prisma.token.update({
        where: { content: refresh },
        data: { active: false },
    });
    return res
        .clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        .sendStatus(204);
};
