import { createContext, useState, ReactNode } from "react";

export interface Claim {
    type: string;
    value: string;
}

export type AuthContextType = {
    auth: any;
    setAuth: any;
};

export interface Authorization {
    sub: string;
    token: string;
    claims: Set<Claim>;
}

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType,
);

export default ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<Authorization | null>(null);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
