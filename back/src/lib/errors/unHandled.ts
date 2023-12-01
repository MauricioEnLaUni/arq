import Maybe from "../utils/Maybe.js";

export default async (_error: unknown, _: any) => {
    return await Promise.resolve(Maybe.nothing<any>());
};
