import { ApplicationError } from "../../../errors/Catalog.js";

export const REDIS_ERRORS = {
    ECONNRESET: new ApplicationError(
        "ECONNRESET",
        "The client cannot connect to the server"
    ),
    MAXCONN: new ApplicationError(
        "MAXCONN",
        "Max connections exceeded."
    ),
    CANT_SET: new ApplicationError(
        "CANT_SET",
        "The record couldn't be set correctly, please review the information provided."
    ),
    SCAN_FAILED: new ApplicationError(
        "SCAN_FAILED",
        "Scan returned an error"
    )
} as const;

export type RedisErrors = keyof typeof REDIS_ERRORS;
