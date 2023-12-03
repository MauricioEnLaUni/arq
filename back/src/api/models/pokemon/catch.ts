import { ICommand } from "../../../lib/Abstractions/ICommand.js";
import { TResult } from "../../../lib/utils/Result.js";


class CatchPokemon implements ICommand
{
    async execute(): Promise<TResult> {
        
        return TResult.Success(undefined);
    }
    async undo(): Promise<TResult> {
        return;
    }
}

export const throwPokeball = () => {
    console.log("stop");
};

export default CatchPokemon;
