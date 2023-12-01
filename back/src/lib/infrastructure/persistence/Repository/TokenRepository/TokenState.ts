import { IContext } from "../infrastructure/IContext.js";
import Token from "./Token.js";

export class TokenState implements IContext
{
    id: string;
    data: {
        active: boolean,
        accessToken: Token | undefined,
        refreshToken: Token | undefined,
    }

    [key: string]: unknown;
};
