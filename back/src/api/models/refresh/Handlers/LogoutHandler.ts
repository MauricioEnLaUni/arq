import Logout from "../Commands/Logout.js";
import TokenHandler from "../TokenHandler.js";
import DecodeJwt from "../Commands/Decode.js";
import LoadUser from "../Commands/LoadUser.js";
import ResponsibilityChain, { ChainLink } from "../../ResponsibilityChain.js";

class LogoutHandler
{
    private decode: DecodeJwt;
    private load: LoadUser;
    private logout: Logout;

    private cor = new ResponsibilityChain();

    private history: ChainLink[] = [];

    constructor(
        jwt: string,
        private handler = new TokenHandler(),
    ) {
        this.decode = new DecodeJwt(this.handler, jwt);

        this.load = new LoadUser(this.handler);
        
        this.logout = new Logout(this.handler);
    }

    async handle()
    {
        const actions = this.cor.buildChain([
            this.decode,
            this.load,
            this.logout,
        ]);

        this.history = actions;
        
        return await this.cor.run({
            chain: actions,
            action: "UNDO",
            stack: []
        });
    }
}

export default LogoutHandler;
