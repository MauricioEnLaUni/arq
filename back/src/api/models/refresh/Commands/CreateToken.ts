import { ICommand } from "../../../../lib/Abstractions/ICommand.js";
import { TResult } from "../../../../lib/utils/Result.js";

import User from "../../user/User.js";
import TokenHandler from "../TokenHandler.js";

class CreateToken implements ICommand
{
    constructor(
        private receiver: TokenHandler,
        private state: string) {  }

    async execute(): Promise<TResult> {
        const result = await this.receiver.CreateToken();
        if (result.isFailure()) return result;

        this.state = (result.value as User).id;
        return TResult.Success(this.state);
    }

    async undo(): Promise<TResult> {
        return await this.receiver.Logout();
    }
}

export default CreateToken;
