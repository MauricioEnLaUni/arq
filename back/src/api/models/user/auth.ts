import { RedisProxy } from "../../../lib/infrastructure/persistence/DatabaseProxy/Redis/RedisProxy.js";

import verify from "../../../lib/infrastructure/encryption/verify.js";

import { ICommand } from "../../../lib/Abstractions/ICommand.js";
import { TResult } from "../../../lib/utils/Result.js";
import User from "../../../lib/infrastructure/persistence/Repository/UsuarioRepository/User.js";

export default async (req, res) => {
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
   });
    return res
        .status(200)
        .json({ id: user.id, nombre: user.nombre, accessToken });
};
