import Token from "../TokenRepository/Token.js";

class User
{
    username: string;
    
    password: string;
    active: boolean;
    accessToken: Token | undefined;
    refreshToken: Token | undefined;

    get id() { return this.username };
    get data() { return {
        password: this.password,
        active: this.active,
        accessToken: this.accessToken,
        refreshToken: this.refreshToken,
    }}
};

export default User;
