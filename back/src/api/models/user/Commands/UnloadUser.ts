import User from "../User.js";
import UserHandler from "./UserHandler.js";
import { ICommand } from "../../../../lib/Abstractions/ICommand.js";
import { TResult } from "../../../../lib/utils/Result.js";

class UnloadUser implements ICommand
{
    constructor(
        private receiver: UserHandler,
        private state: string) {  }

    async execute(): Promise<TResult> {
        const result = await this.receiver.ClearUser();
        if (result.isFailure()) return result;

        this.state = (result.value as User).id;

        return TResult.Success(this.state);
    }
    async undo(): Promise<TResult> {
        return await this.receiver.LoadUser(this.state);
    }
}

export default UnloadUser;
