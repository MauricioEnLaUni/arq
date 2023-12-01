import { ICommand } from "../../../../lib/Abstractions/ICommand.js";
import { TResult } from "../../../../lib/utils/Result.js";
import TokenHandler from "../TokenHandler.js";

class LoadUser implements ICommand
{
    constructor(
        private receiver: TokenHandler,
        private state: string) {  }

    async execute(): Promise<TResult> {
        return await this.receiver.LoadUser(this.state);
    }

    async undo(): Promise<TResult> {
        return this.receiver.ClearUser();
    }
}

export default LoadUser;
