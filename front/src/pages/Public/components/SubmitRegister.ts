import { FormEvent } from "react";

import axios from "../../../api/axios";
import httpError from "../../../lib/Errors/httpError";

export default async (event: FormEvent<HTMLFormElement>, setters: any) => {
    event.preventDefault();
    // @ts-ignore
    const { username, password, } = event.target;

    try {
        const response = await axios.post("/users/new", {
            username: username.value,
            password: password.value,
        }, {
            headers: { "Content-Type": "application/json" },

        });
        // @ts-ignore
        event.target.reset();

        setters.auth(response.data);
    } catch(error) {
        httpError(setters.axios);
    }
};
