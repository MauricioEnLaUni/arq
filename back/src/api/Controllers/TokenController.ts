import express from "express";

import verify from "../models/refresh/verify.js";

const router = express.Router();

router.route("/refresh").post(verify);

router.route("/logout").post((req, res) => {
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
    });

export { router as TokenController };
