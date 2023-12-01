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
    VALUE_OUT_RANGE: new ApplicationError(
        "VALUE_OUT_RANGE",
        "Enumerator does not contain member"
    ),
    UPDATE_FAILED: new ApplicationError(
        "UPDATE_FAILED",
        "Update failed for record"
    ),
    NO_RECORDS: new ApplicationError(
        "NO_RECORDS",
        "Database returned empty"
    ),
    INFINITE_LOOP: new ApplicationError(
        "INFINITE_LOOP",
        "Triggers an infinite loop"
    ),
} as const;

export type ErrorCatalog = keyof typeof ERRORS;

export interface IError
{
    code: string | number | undefined,
    msg: string | undefined,
};

export default ERRORS;
