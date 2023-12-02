import { ICommand } from "../../../../lib/Abstractions/ICommand.js";
import ERRORS from "../../../../lib/errors/Catalog.js";
import { TResult } from "../../../../lib/utils/Result.js";

import TokenHandler from "../TokenHandler.js";

class Logout implements ICommand
{
    constructor(
        private receiver: TokenHandler) {  }

    async execute(): Promise<TResult> {
        return await this.receiver.Logout();
    }

    async undo(): Promise<TResult> {
        return TResult.Failure(ERRORS.NOT_IMPLEMENTED);
    }
}

export default Logout;
