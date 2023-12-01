import { TokenState } from "../TokenState.js";
import { Result } from "../../../../../utils/Result.js";
import { ICommand } from "../../infrastructure/ICommand.js";
import { RedisProxy } from "../../../DatabaseProxy/Redis/RedisProxy.js";

export class CreateRecord implements ICommand
{
    constructor(
        private readonly state: TokenState) {  }

    async execute(db: RedisProxy)
    {
        await db.upsert(this.state);
        return Result.Success();
    }

    async undo(db: RedisProxy)
    {
        await db.rm(this.state.id);
        return Result.Success();
    }
}
