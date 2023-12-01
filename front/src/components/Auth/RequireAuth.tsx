import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ROLES = {
    VISITOR: 0,
    USER: 1,
    EDITOR: 2
} as const;

type Roles = typeof ROLES[keyof typeof ROLES];

const binaryArray = (n?: number, next: number = 0, values: Array<number | undefined> = []): number[] => {
    if (!n) return [... values, n].filter(Number) as number[];

    const power = Math.floor(Math.log2(n));
    const current = 2 ** power;

    const nextValue = n - current;
    const rol = (n & current) ? current : undefined;

    return binaryArray(nextValue, next + 1, [... values, rol]);
}

export default ({ allowedRoles }: { allowedRoles: Set<Roles> }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return binaryArray(auth?.roles).find(rol => allowedRoles.has(rol as Roles)) ?
    ( <Outlet /> ) :
        auth?.nombreUsuario ?
            (<Navigate to="/unauthorized" state={{ from: location }} replace /> )
            : (<Navigate to="/auth/register" state={{ from: location }} replace /> );
};
