import { ApplicationError } from "../../../../errors/Catalog.js";

export const USUARIO_ERROR = {
    NOT_FOUND: new ApplicationError(
        "NOT_FOUND",
        "El usuario ingresado no existe"
    ),
    WRONG_PASSWORD: new ApplicationError(
        "WRONG_PASSWORD",
        "El password no coincide, ¿olvidó su password?"
    ),
    DISABLED: new ApplicationError(
        "DISABLED",
        "Su usuario ha sido desactivado"
    )
} as const;

export type ErroresUsuario = keyof typeof USUARIO_ERROR;
