import { TokenState } from "../TokenState.js";
import { Result } from "../../../../../utils/Result.js";
import { ICommand } from "../../infrastructure/ICommand.js";
import { RedisProxy } from "../../../DatabaseProxy/Redis/RedisProxy.js";
import ERRORS from "../../../../../errors/Catalog.js";

export class DisableUser implements ICommand
{
    constructor(
        private state: TokenState) { }
    
    async execute(db: RedisProxy, ctx: TokenState)
    {
        const { id } = this.state;

        const data = {
            active: false,
            accessToken: undefined,
            refreshToken: undefined
        };
        this.state = ctx;

        await db.upsert({ ... data, id });
        return Result.Success();
    }

    async undo(db: RedisProxy)
    {
        const { id, data } = this.state;
        const record = await db.single(id);
        if (record.isFailure()) {
            return Result.Failure(ERRORS.NOT_FOUND);
        }

        const { accessToken, refreshToken } = data;
        const now = new Date(Date.now());

        const actualRefresh = refreshToken.expires < now
            ? refreshToken : undefined;
        const actualAccess = accessToken.expires < now && actualRefresh
            ? accessToken : undefined;

        await db.upsert({ id, active: true, actualAccess, actualRefresh });
        return Result.Success();
    }
}
