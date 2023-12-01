import { ICommand } from "../../../../lib/Abstractions/ICommand.js";
import { TResult } from "../../../../lib/utils/Result.js";
import UserDto from "./UserDto.js";
import UserHandler from "./UserHandler.js";

class CreateUser implements ICommand
{
    constructor(
        private receiver: UserHandler,
        private state: UserDto) {  }

    async execute(): Promise<TResult> {
        return await this.receiver.CreateUser(this.state);
    }
    async undo(): Promise<TResult> {
        return await this.receiver.RemoveUser(this.state.username);
    }
}

export default CreateUser;
