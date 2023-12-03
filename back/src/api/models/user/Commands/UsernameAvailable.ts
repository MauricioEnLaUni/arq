import { ICommand } from "../../../../lib/Abstractions/ICommand.js";
import ERRORS from "../../../../lib/errors/Catalog.js";
import { TResult } from "../../../../lib/utils/Result.js";
import UserHandler from "./UserHandler.js";

class UsernameAvailableCommand implements ICommand
{
    constructor(
        private receiver: UserHandler,
        private state: string) {  }

    async execute(): Promise<TResult> {
        return await this.receiver.UsernameAvailable(this.state);
    }

    async undo(): Promise<TResult> {
        return TResult.Failure(ERRORS.NOT_IMPLEMENTED);
    }
}

export default UsernameAvailableCommand;
