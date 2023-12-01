import { TokenState } from "../TokenState.js";
import { Result } from "../../../../../utils/Result.js";
import { TOKEN_ERROR } from "../Errors.js";
import { ICommand } from "../../infrastructure/ICommand.js";
import { RedisProxy } from "../../../DatabaseProxy/Redis/RedisProxy.js";

export class ExpireToken implements ICommand
{
    constructor(
        private state: TokenState) { }

    async execute(db: RedisProxy, ctx: TokenState): Promise<Result>
    {
        const { id } = this.state;
        const { accessToken, refreshToken } = ctx.data;

        const now = new Date(Date.now());
        const actualRefresh = refreshToken.expires > now ? refreshToken
            : undefined;
        const actualAccess = actualRefresh && accessToken.expires > now
            ? accessToken : undefined;

        this.state = ctx;
        await db.upsert({
            id,
            ... ctx.data,
            accessToken: actualAccess,
            refreshToken: actualRefresh
        });

        return Result.Success();
    }

    async undo(_: RedisProxy): Promise<Result>
    {
        return Result.Failure(TOKEN_ERROR.NOT_IMPLEMENTED);
    }
}
