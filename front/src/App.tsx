import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import RequireAuth from "./components/Auth/RequireAuth";
import RedirectAuth from "./components/Auth/RedirectOnAuth";
import GeneralLayout from "./components/Layout/GeneralLayout";
import useAuth from "./hooks/useAuth";

const Register = lazy(() => import("./pages/Public/Register"));
const Login = lazy(() => import("./pages/Public/Login"));
const PokemonMain = lazy(() => import("./pages/Private/Pokemon"));
const SinglePokemon = lazy(() => import("./pages/Private/SinglePokemon"));

export default () => {
    const { auth } = useAuth();
    console.log(auth);

    return (
        <Routes>
            <Route
                element={<RequireAuth allowedRoles={new Set([1])} />}></Route>
            <Route element={<RedirectAuth />}>
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/login" element={<Login />} />
            </Route>

            <Route element={<GeneralLayout />}>
                <Route path="/" element={<PokemonMain />} />
                <Route path="/:pokemon" element={<SinglePokemon />} />
            </Route>
        </Routes>
    );
};
