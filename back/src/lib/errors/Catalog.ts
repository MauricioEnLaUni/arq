export class ApplicationError implements IError
{
    constructor(
        public readonly code: string | number | undefined,
        public readonly msg: string | undefined = undefined) { }
}

const ERRORS = {
    NONE: new ApplicationError(undefined),
    NOT_FOUND: new ApplicationError(
        "NOT_FOUND",
        "Record not found"
    ),
    NOT_IMPLEMENTED: new ApplicationError(
        "NOT_IMPLEMENTED",
        "Method not Implemented"
    ),
} as const;

export type ErrorCatalog = keyof typeof ERRORS;

export interface IError
{
    code: string | number | undefined,
    msg: string | undefined,
};

export default ERRORS;
