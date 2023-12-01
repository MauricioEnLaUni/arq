import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import RequireAuth from "./components/Auth/RequireAuth";
import RedirectAuth from "./components/Auth/RedirectOnAuth";

const Register = lazy(() => import("./pages/Public/Register"));
const Login = lazy(() => import("./pages/Public/Login"));
const PokemonMain = lazy(() => import("./pages/Private/Pokemon"));

export default () => {
    return (
        <Routes>
            <Route element={<RequireAuth allowedRoles={new Set([1])} />}>
                
            </Route>
            <Route element={<RedirectAuth />}>
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/login" element={<Login />} />
            </Route>

            <Route path="/" element={<PokemonMain />}/>
        </Routes>
    );
};
