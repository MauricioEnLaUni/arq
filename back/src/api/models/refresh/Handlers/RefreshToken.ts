import LoadUser from "../Commands/LoadUser.js";
import ResponsibilityChain, { ChainLink } from "../../ResponsibilityChain.js";
import TokenHandler from "../TokenHandler.js";
import ExpireToken from "../Commands/ExpireToken.js";
import VerifyJwt from "../Commands/VerifyJwt.js";

class RefreshToken
{
    private load: LoadUser;
    private expire: ExpireToken;
    private verify: VerifyJwt;

    private cor = new ResponsibilityChain();

    private history: ChainLink[] = [];

    constructor(
        username: string,
        private handler = new TokenHandler(),
    ) {
        this.load = new LoadUser(this.handler, username);

        this.expire = new ExpireToken(this.handler);

        this.verify = new VerifyJwt(this.handler);
    }

    async handle()
    {
        const actions = this.cor.buildChain([
            this.load,
            this.expire,
            this.verify,
        ]);

        this.history = actions;
        
        return await this.cor.run({
            chain: actions,
            action: "UNDO",
            stack: []
        });
    }
}

export default RefreshToken;
