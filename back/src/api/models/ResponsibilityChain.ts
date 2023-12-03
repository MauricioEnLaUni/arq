import { ICommand } from "../../lib/Abstractions/ICommand.js";
import ERRORS from "../../lib/errors/Catalog.js";
import EmptyCommand from "../../lib/models/EmptyCommand.js";
import { TResult } from "../../lib/utils/Result.js";

export const COR_RESPONSES = { BREAK: "BREAK", UNDO: "UNDO", CONTINUE: "CONTINUE" } as const;
export type ChainResponses = keyof typeof COR_RESPONSES;

export type ChainLink = {
    current: ICommand,
    next: ICommand,
    first?: boolean,
}

type RCProps = {
    chain: ChainLink[],
    recursion?: boolean,
    bind?,
    action?: ChainResponses,
    stack?: ChainLink[],
};

class ResponsibilityChain
{
    async run({
        chain,
        recursion = false,
        bind = (cmd: ChainLink) => { return cmd.current.execute() },
        action = "BREAK",
        stack = [],
    }: RCProps) {
        if (recursion) {
            return TResult.Failure(ERRORS.INFINITE_LOOP);
        }
        if (action === "UNDO" && !stack) {
            return TResult.Failure(ERRORS.NOT_IMPLEMENTED);
        }
    
        let result: TResult;
        for (const i in chain)
        {
            const index = Number(i);
            const current = await bind(chain[i]);

            if (index === 0) {
                stack.push({
                    current: chain[i].current,
                    next: new EmptyCommand(),
                });
            } else {
                stack.push({
                    current: chain[i].current,
                    next: chain[index - 1].current,
                });
            }

            if (current.isSuccess()) {
                result = current;
                continue;
            }
    
            if (action === "BREAK") {
                result = current;
                break;
            }
            if (action === "UNDO") {
                chain.splice(0);
                this.run({
                    chain: stack,
                    recursion: true,
                    bind: (link: ChainLink) => { return link.current.undo(); },
                    action: "BREAK",
                });
            }
        }
    
        return result;
    }

    buildChain = (cmd: ICommand[]): ChainLink[] => {
        return cmd.map((c, i) => ({
            first: i === 0,
            current: c,
            next: i + 1 !== cmd.length ? c[i + 1] : new EmptyCommand(),
        }));
    }

}

export default ResponsibilityChain;
