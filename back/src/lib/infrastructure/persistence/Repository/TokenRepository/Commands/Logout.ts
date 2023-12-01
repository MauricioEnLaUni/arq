import { TokenState } from "../TokenState.js";
import { Result } from "../../../../../utils/Result.js";
import { TOKEN_ERROR } from "../Errors.js";
import { RedisProxy } from "../../../DatabaseProxy/Redis/RedisProxy.js";
import { ICommand } from "../../infrastructure/ICommand.js";

export class ActivateUser implements ICommand
{
    constructor(
        private state: TokenState) { }

    async execute(db: RedisProxy, ctx: TokenState): Promise<Result>
    {
        const { id } = this.state;
        
        await db.upsert({ ... ctx.data, id, active: true });
        this.state = ctx;

        return Result.Success();
    }

    async undo(db: RedisProxy): Promise<Result>
    {
        const { id } = this.state;
        const record = await db.single(id);

        if (!record) {
            return Result.Failure(TOKEN_ERROR.NOT_FOUND);
        }
        
        await db.upsert({ ... this.state, id, active: false });

        return Result.Success();
    }
}
