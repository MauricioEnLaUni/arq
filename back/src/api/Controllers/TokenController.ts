import express from "express";

import RefreshTokenHandler from "../models/refresh/Handlers/RefreshTokenHandler.js";
import TokenHandler from "../models/refresh/TokenHandler.js";
import LogoutHandler from "../models/refresh/Handlers/LogoutHandler.js";

const router = express.Router();

router.route("/refresh").post(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.["74f913380c62fc3c08755a33f9457a58"]) {
        return res.sendStatus(401);
    }
    const refresh = cookies["74f913380c62fc3c08755a33f9457a58"];

    const tokenHandler = new TokenHandler();
    const handler = new RefreshTokenHandler(refresh, tokenHandler);

    const result = await handler.handle();
    if (result.isFailure()) {
        return res.json(result);
    }

    const verify = result.value as () => any;
    verify();

    return res.status(200);
});

router.route("/logout").post((req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }

    const refresh = cookies.jwt;

    const handler = new LogoutHandler(refresh);
    handler.handle();
    
    return res
        .clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        .sendStatus(204);
    });

export { router as TokenController };
