import { TokenState } from "../TokenState.js";
import { Result } from "../../../../../utils/Result.js";
import { ICommand } from "../../infrastructure/ICommand.js";
import { RedisProxy } from "../../../DatabaseProxy/Redis/RedisProxy.js";

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

        const result = await db.upsert(
            { ... this.state.data, id, active: false }
        );

        return Result.Success();
    }
}
