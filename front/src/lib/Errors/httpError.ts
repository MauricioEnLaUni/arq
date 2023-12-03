import { AxiosError } from "axios";

export default (error: unknown) => {
    const err = error as AxiosError;

    if (err.response) {
        switch (err.response.status) {
            case 400:
            case 401:
            case 403:
            case 404:
            case 405:
            case 406:
            case 408:
            case 409:
            case 410:
            case 413:
            case 418:
            case 423:
            case 424:
            case 429:
            case 503:
            default:
                return "Internal Server Error";
        }
    } else if (err.request) {
    } else {
        console.error(error);
    }
};
