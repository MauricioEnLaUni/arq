import { ICommand } from "../../../../lib/Abstractions/ICommand.js";
import User from "../../../../lib/infrastructure/persistence/Repository/UsuarioRepository/User.js";
import { TResult } from "../../../../lib/utils/Result.js";
import UserHandler from "./UserHandler.js";

class RemoveUser implements ICommand
{
    constructor(
        private receiver: UserHandler,
        private state: User) {  }

    async execute(): Promise<TResult> {
        const result = await this.receiver.RemoveUser(this.state.username);
        if (result.isFailure()) return result;

        this.state = result.value as User;
        return TResult.Success(this.state.username);
    }
    async undo(): Promise<TResult> {
        return await this.receiver.CreateUser(this.state);
    }
}

export default RemoveUser;
