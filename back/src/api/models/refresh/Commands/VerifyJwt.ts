import { ICommand } from "../../../../lib/Abstractions/ICommand.js";
import { TResult } from "../../../../lib/utils/Result.js";

import TokenHandler from "../TokenHandler.js";

class VerifyJwt implements ICommand
{
    constructor(
        private receiver: TokenHandler) {  }

    async execute(): Promise<TResult> {
        return await this.receiver.VerifyJwt();
    }

    async undo(): Promise<TResult> {
        return await this.receiver.Logout();
    }
}

export default VerifyJwt;
