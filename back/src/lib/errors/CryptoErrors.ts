import { ApplicationError } from "./Catalog.js";

const CRYPTO_ERRORS = {
    WRONG_HMAC: new ApplicationError(
        "WRONG_HMAC",
        "HMAC does not match"
    ),
} as const;

export type CryptoErrors = keyof typeof CRYPTO_ERRORS;

export default CRYPTO_ERRORS;
