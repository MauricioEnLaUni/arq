import { ICommand } from "../Abstractions/ICommand.js";
import { TResult } from "../utils/Result.js";

class EmptyCommand implements ICommand
{
    async execute(): Promise<TResult> {
        return undefined;
    }
    async undo()
    {
        return undefined;
    }
}

export default EmptyCommand;
