import LoadUser from "../Commands/LoadUser.js";
import ResponsibilityChain, { ChainLink } from "../../ResponsibilityChain.js";
import VerifyPassword from "../Commands/VerifyPassword.js";
import TokenHandler from "../TokenHandler.js";
import CreateToken from "../Commands/CreateToken.js";

class HandleLogin
{
    private create: CreateToken;
    private load: LoadUser;
    private verify: VerifyPassword;

    private cor = new ResponsibilityChain();

    private history: ChainLink[] = [];

    constructor(
        username: string,
        password: string,
        private handler = new TokenHandler(),
    ) {
        this.load = new LoadUser(this.handler, username);

        this.verify = new VerifyPassword(this.handler, password);

        this.create = new CreateToken(this.handler,username);
    }

    async handle()
    {
        const actions = this.cor.buildChain([
            this.load,
            this.verify,
            this.create
        ]);

        this.history = actions;
        
        return await this.cor.run({
            chain: actions,
            action: "UNDO",
            stack: []
        });
    }
}

export default HandleLogin;
