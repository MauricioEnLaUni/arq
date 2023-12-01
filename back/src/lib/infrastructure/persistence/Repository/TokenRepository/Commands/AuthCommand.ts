import jwt from "jsonwebtoken";

import { TokenState } from "../TokenState.js";
import { TOKEN_ERROR } from "../Errors.js";
import { Result } from "../../../../../utils/Result.js";
import { ICommand } from "../../infrastructure/ICommand.js";
import { RedisProxy } from "../../../DatabaseProxy/Redis/RedisProxy.js";
import User from "../../UsuarioRepository/User.js";

export class AuthCommand implements ICommand
{
    constructor(
        private state: TokenState) { }

    async execute(db: RedisProxy, ctx: User)
    {
        const { active, accessToken, refreshToken } = ctx.data;

        if (!active) {
            return Result.Failure(TOKEN_ERROR.DISABLED);
        }

        const now = new Date(Date.now());
        
        if (accessToken && accessToken.expires > now) {
            return Result.Failure(TOKEN_ERROR.ACTIVE_ACCESS);
        }

        if (!refreshToken && refreshToken.expires > now) {
            return Result.Failure(TOKEN_ERROR.ACTIVE_ACCESS);
        }

        await db.upsert(this.state);
        this.state = ctx;

        return Result.Success();
    }

    async undo(db: RedisProxy)
    {
        await db.upsert(this.state);
        return Result.Success();
    }
}
