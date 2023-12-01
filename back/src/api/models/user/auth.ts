import { RedisProxy } from "../../../lib/infrastructure/persistence/DatabaseProxy/Redis/RedisProxy.js";

import verify from "../../../lib/infrastructure/encryption/verify.js";
import jwt from "jsonwebtoken";

export default async (req, res) => {
    const { username, password } = req.body;

    if (!user) {
        return res.status(404).send("Usuario desconocido");
    } else if (await verify(password, user.password)) {
        return res.status(400).send("Usuario o password incorrecto.");
    }

    const accessToken = jwt.sign(
        {
            id: user.id,
            nombre: user.nombre,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" },
    );
    const refreshToken = jwt.sign(
        {
            id: user.id,
            nombre: user.nombre,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" },
    );
    await 

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
   });
    return res
        .status(200)
        .json({ id: user.id, nombre: user.nombre, accessToken });
};
