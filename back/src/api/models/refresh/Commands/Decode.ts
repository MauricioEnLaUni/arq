import { ICommand } from "../../../../lib/Abstractions/ICommand.js";
import ERRORS from "../../../../lib/errors/Catalog.js";
import { TResult } from "../../../../lib/utils/Result.js";

import TokenHandler from "../TokenHandler.js";

class DecodeJwt implements ICommand
{
    constructor(
        private receiver: TokenHandler,
        private state: string,) {  }

    async execute(): Promise<TResult> {
        return await this.receiver.DecodeJwt(this.state);
    }

    async undo(): Promise<TResult> {
        return TResult.Failure(ERRORS.NOT_IMPLEMENTED);
    }
}

export default DecodeJwt;
