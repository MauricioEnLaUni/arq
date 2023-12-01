interface ResponseError extends Error {
    status?: string;
    statusCode?: number;
}

export default class HTTPError implements ResponseError {
    status: string;
    name: string = "";
    isOperational = false;

    constructor(
        public message: string,
        public statusCode: number,
    ) {
        this.status =
            this.statusCode >= 400 && this.statusCode <= 500 ? "fail" : "error";

        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
