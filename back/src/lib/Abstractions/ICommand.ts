import { TResult } from "../utils/Result.js";

export interface ICommand
{
    execute(): Promise<TResult>;

    undo(): Promise<TResult>;
};
