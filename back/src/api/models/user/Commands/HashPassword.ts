import { ICommand } from "../../../../lib/Abstractions/ICommand.js";
import ERRORS from "../../../../lib/errors/Catalog.js";
import { TResult } from "../../../../lib/utils/Result.js";
import UserHandler from "./UserHandler.js";

class HashPassword implements ICommand
{
    constructor(
        private receiver: UserHandler) {  }

    async execute(): Promise<TResult> {
        return await this.receiver.Hash();
    }

    async undo(): Promise<TResult> {
        return TResult.Failure(ERRORS.NOT_IMPLEMENTED);
    }
}

export default HashPassword;