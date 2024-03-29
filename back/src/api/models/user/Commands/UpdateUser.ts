import User from "../User.js";
import UserHandler from "./UserHandler.js";
import { ICommand } from "../../../../lib/Abstractions/ICommand.js";
import { TResult } from "../../../../lib/utils/Result.js";

class UpdateUser implements ICommand
{
    constructor(
        private receiver: UserHandler,
        private state: User) {  }

    async execute(): Promise<TResult> {
        const temp = this.receiver.current;
        const result = await this.receiver.UpdateUser(this.state);

        if (result.isFailure()) return result;

        this.state = temp;
        return TResult.Success(`Usuario ${ this.state.id } actualizado`);
    }
    async undo(): Promise<TResult> {
        const temp = this.receiver.current;
        const result = await this.receiver.UpdateUser(this.state);

        if (result.isFailure()) return result;
        this.state = temp;
        return TResult.Success(`Usuario ${ this.state.id } restaurado`);
    }
}

export default UpdateUser;
