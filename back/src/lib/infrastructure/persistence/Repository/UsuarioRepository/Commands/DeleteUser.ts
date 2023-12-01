import { ICommand } from "../../infrastructure/ICommand.js";
import { Result } from "../../../../../utils/Result.js";
import { IDbProxy } from "../../../DatabaseProxy/IDbProxy.js";
import { RedisProxy } from "../../../DatabaseProxy/Redis/RedisProxy.js";
import User from "../User.js";
import jwt from "jsonwebtoken";
import AUTH_ERROR from "../../../../../errors/AuthError.js";

export class CrearUsuario implements ICommand
{
    private state: string;
    
    async execute(db: RedisProxy, ctx?: User): Promise<Result> {
        

        const usr = (await db.single(ctx.username)).value as User;
        await db.upsert({ id: ctx.username, data: { password: usr.password, accessToken, refreshToken }});

        return Result.Success();
    }
    async undo(db: IDbProxy): Promise<Result> {
        await db.rm(this.state);

        return Result.Success();
    }
    
}
