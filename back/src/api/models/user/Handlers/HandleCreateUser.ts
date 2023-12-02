import LoadUser from "../Commands/LoadUser.js";
import CreateUser from "../Commands/CreateUser.js";
import UnloadUser from "../Commands/UnloadUser.js";
import UserHandler from "../Commands/UserHandler.js";
import HashPassword from "../Commands/HashPassword.js";
import ResponsibilityChain, { ChainLink } from "../../ResponsibilityChain.js";

class HandleCreateUser
{
    private create: CreateUser;
    private hash: HashPassword;
    private load: LoadUser;
    private unload: UnloadUser;

    private cor = new ResponsibilityChain();

    private history: ChainLink[] = [];

    constructor(
        username,
        password,
        private handler = new UserHandler(),
    ) {
        this.load = new LoadUser(this.handler, username);

        this.create = new CreateUser(this.handler, {
            username,
            password
        });

        this.hash = new HashPassword(this.handler);
    }

    async handle()
    {
        const actions = this.cor.buildChain([
            this.load,
            this.hash,
            this.create,
            this.unload,
        ]);

        this.history = actions;
        
        return await this.cor.run({
            chain: actions,
            action: "UNDO",
            stack: []
        });
    }
}

export default HandleCreateUser;
