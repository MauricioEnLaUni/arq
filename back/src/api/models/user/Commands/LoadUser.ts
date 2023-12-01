import { ICommand } from "../../../../lib/Abstractions/ICommand.js";
import { TResult } from "../../../../lib/utils/Result.js";
import UserHandler from "./UserHandler.js";

class LoadUser implements ICommand
{
    constructor(
        private receiver: UserHandler,
        private state: string) {  }

    async execute(): Promise<TResult> {
        return await this.receiver.LoadUser(this.state);
    }

    async undo(): Promise<TResult> {
        return this.receiver.ClearUser();
    }
}

export default LoadUser;
