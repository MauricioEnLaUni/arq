import { ICommand } from "../../../../lib/Abstractions/ICommand.js";
import ERRORS from "../../../../lib/errors/Catalog.js";
import { TResult } from "../../../../lib/utils/Result.js";
import Token from "../Token.js";
import TokenHandler from "../TokenHandler.js";

class ExpireToken implements ICommand
{
    constructor(
        private receiver: TokenHandler,) { }

    async execute()
    {
        return await this.receiver.ExpireToken();
    }

    async undo()
    {
        return TResult.Failure(ERRORS.NOT_IMPLEMENTED);
    }
}

export default ExpireToken;
