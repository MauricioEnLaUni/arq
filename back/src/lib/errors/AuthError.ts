import { ApplicationError } from "./Catalog.js";

const AUTH_ERROR = {
    CONFLICT: new ApplicationError(
        "CONFLICT",
        "La cuenta de usuario ya está asignada"
    ),
    WRONG_PASSWORD: new ApplicationError(
        "WRONG_PASSWORD",
        "El password está equivocado"
    ),
} as const;

export default AUTH_ERROR;
