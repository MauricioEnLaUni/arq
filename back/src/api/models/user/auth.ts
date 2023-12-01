import { RedisProxy } from "../../../lib/infrastructure/persistence/DatabaseProxy/Redis/RedisProxy.js";

import verify from "../../../lib/infrastructure/encryption/verify.js";
import jwt from "jsonwebtoken";
import { ICommand } from "../../../lib/Abstractions/ICommand.js";
import { TResult } from "../../../lib/utils/Result.js";
import User from "../../../lib/infrastructure/persistence/Repository/UsuarioRepository/User.js";

class AuthUser implements ICommand
{
    constructor(
        private state: User,) { }

    async execute(): Promise<TResult> {
        const { username, } = this.state;

        const accessToken = jwt.sign(
            {
                username, 
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" },
        );
        const refreshToken = jwt.sign(
            {
                username,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" },
        );

        return TResult.Success({
            accessToken,
            refreshToken,
        });
    }
    undo(): Promise<TResult> {
        throw new Error("Method not implemented.");
    }
    
}

export default async (req, res) => {
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
   });
    return res
        .status(200)
        .json({ id: user.id, nombre: user.nombre, accessToken });
};
