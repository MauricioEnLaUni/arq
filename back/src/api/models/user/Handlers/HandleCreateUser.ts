import CreateUser from "../Commands/CreateUser.js";
import UserHandler from "../Commands/UserHandler.js";
import HashPassword from "../Commands/HashPassword.js";
import ResponsibilityChain, { ChainLink } from "../../ResponsibilityChain.js";
import UsernameAvailableCommand from "../Commands/UsernameAvailable.js";

class HandleCreateUser
{
    private create: CreateUser;
    private hash: HashPassword;
    private available: UsernameAvailableCommand;

    private cor = new ResponsibilityChain();

    private history: ChainLink[] = [];

    constructor(
        username,
        password,
        private handler = new UserHandler(),
    ) {
        this.available = new UsernameAvailableCommand(this.handler, username);

        this.create = new CreateUser(this.handler, username);

        this.hash = new HashPassword(this.handler, password);
    }

    async handle()
    {
        const actions = this.cor.buildChain([
            this.available,
            this.hash,
            this.create,
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
