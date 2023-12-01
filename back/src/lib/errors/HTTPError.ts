import { ApplicationError } from "./Catalog.js";

const HTTP_ERROR = {
    409: new ApplicationError(
        "CONFLICT",
        "Resource already exists"
    ),
} as const;

export default HTTP_ERROR;
