import { ICommand } from "../../infrastructure/ICommand.js";
import { Result } from "../../../../../utils/Result.js";
import { IDbProxy } from "../../../DatabaseProxy/IDbProxy.js";
import { RedisProxy } from "../../../DatabaseProxy/Redis/RedisProxy.js";
import User from "../User.js";
import AUTH_ERROR from "../../../../../errors/AuthError.js";

export class CrearUsuario implements ICommand
{
    private state: string;
    
    async execute(db: RedisProxy, ctx?: User): Promise<Result> {
        const id = ctx.username;
        const usr = await db.single(id);

        if (usr) return Result.Failure(AUTH_ERROR.CONFLICT);

        await db.upsert({
            id,
            data: { password: ctx.password, },
        });

        this.state = id;

        return Result.Success();
    }
    async undo(db: IDbProxy): Promise<Result> {
        await db.rm(this.state);

        return Result.Success();
    }
    
}
