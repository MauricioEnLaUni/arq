import Token from "./Token.js";

export class TokenState
{
    id: string;
    data: {
        active: boolean,
        accessToken: Token | undefined,
        refreshToken: Token | undefined,
    }

    [key: string]: unknown;
};
