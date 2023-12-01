import { PrismaClient } from "@prisma/client";
import { ICommand } from "../../../lib/Abstractions/ICommand.js";
import { TResult } from "../../../lib/utils/Result.js";
import PgProxy from "../../../lib/proxies/PgProxy.js";
import RedisProxy from "../../../lib/proxies/RedisProxy.js";
import User from "../../../lib/infrastructure/persistence/Repository/UsuarioRepository/User.js";
import ERRORS from "../../../lib/errors/Catalog.js";

class DeleteUsers implements ICommand
{
    constructor(
        private state: User) {  }

    async execute(): Promise<TResult> {
        const p = new PgProxy("USERS");
        const r = new RedisProxy();

        const results = await Promise.all([
            p.rm(this.state.id),
            r.rm(this.state.id),
        ]);

        const result = !results.some(e => e.isFailure);
        if (result) return TResult.Failure(ERRORS.UPDATE_FAILED);
        this.undo();

        return TResult.Success(`Removed ${ this.state.id }`);
    }
    async undo(): Promise<TResult> {
        const p = new PgProxy("USERS");
        const r = new RedisProxy();

        const results = await Promise.all([
            p.upsert({ id: this.state.id, data: this.state.data }),
            r.upsert({ id: this.state.id, data: this.state.data }),
        ]);
        
        const result = !results.some(e => e.isFailure);
        if (result) return TResult.Failure(ERRORS.UPDATE_FAILED);

        return TResult.Success(`Reset ${ this.state.id }`);
    }
    
}

export default async (req, res) => {
    const { id } = req.id;
    const prisma = new PrismaClient();

    try {
        await prisma.usuarios.delete({
            where: { id },
        });

        return res.status(204).send(`Usuario eliminado: ${id}`);
    } catch (error) {
        return res.status(404).send("Usuario no encontrado.");
    }
};
