import { FormEvent } from "react";

import axios from "../../../api/axios";
import httpError from "../../../lib/Errors/httpError";

export default async (event: FormEvent<HTMLFormElement>, setters: any) => {
    event.preventDefault();
    // @ts-ignore
    const { usr, pwd, } = event.target;

    try {
        const response = await axios.post("/auth/new", {
            usuario: usr.value,
            password: pwd.value,
        });
        setters.auth(response.data);
    } catch(error) {
        httpError(setters.axios);
    }
};
