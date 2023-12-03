import ERRORS, { IError } from "../errors/Catalog.js";

export class Result
{
    private constructor(
        public readonly isSuccess: boolean, public readonly error: IError) { }

    public isFailure = !this.isSuccess;

    public static Success()
    {
        return new Result(true, ERRORS.NONE);
    }

    public static Failure(error: IError)
    {
        return new Result(false, error);
    }
}

export class TResult
{
    private constructor(
        public readonly value: unknown, public readonly error: IError){ }

    public static Success(value: unknown)
    {
        return new TResult(value, ERRORS.NONE);
    }

    public static Failure(error: IError)
    {
        return new TResult(undefined, error);
    }

    public isSuccess(): boolean
    {
        return Boolean(this.value);
    }

    public isFailure(): boolean
    {
        return this.value === undefined;
    }
}
