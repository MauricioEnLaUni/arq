import { ApplicationError } from "./Catalog.js";

export const TOKEN_ERROR = {
    SET_FAILED: new ApplicationError(
        "SET_FAILED",
        "El registro no se ha podido guardar."),
    NOT_FOUND: new ApplicationError(
        "TOKEN_NOT_FOUND",
        "No se encontró al usuario en la base de datos de tokens"),
    DISABLED: new ApplicationError(
        "DISABLED",
        "User is unavailable"),
    ACTIVE_ACCESS: new ApplicationError(
        "ACTIVE_ACCESS",
        "El usuario tiene un token de acceso activo"),
    ACTIVE_REFRESH: new ApplicationError(
        "ACTIVE_REFRESH",
        "El usuario tiene un token de refresh activo"),
    EXPIRED_ACCESS: new ApplicationError(
        "EXPIRED_ACCESS",
        "Access Token has expired"),
    EXPIRED_REFRESH: new ApplicationError(
        "EXPIRED_REFRESH",
        "Refresh Token has expired"),
    CONFLICT: new ApplicationError(
        "CONFLICT",
        "Registro ya existe"),
    NOT_IMPLEMENTED: new ApplicationError(
        "NOT_IMPLEMENTED",
        "Este comando no se puede deshacer"),
} as const;

export type TokenErrors = keyof typeof TOKEN_ERROR;
