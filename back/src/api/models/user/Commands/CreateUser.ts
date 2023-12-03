import UserHandler from "./UserHandler.js";
import { ICommand } from "../../../../lib/Abstractions/ICommand.js";
import { TResult } from "../../../../lib/utils/Result.js";

class CreateUser implements ICommand
{
    constructor(
        private receiver: UserHandler,
        private state: string) {  }

    async execute(): Promise<TResult> {
        return await this.receiver.CreateUser();
    }
    async undo(): Promise<TResult> {
        return await this.receiver.RemoveUser(this.state);
    }
}

export default CreateUser;
