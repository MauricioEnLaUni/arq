import { FormEvent } from "react";

import axios from "../../../api/axios";
import { Authorization } from "../../../Providers/AuthProvider";
import httpError from "../../../lib/Errors/httpError";

export default async (event: FormEvent<HTMLFormElement>, setters: any) => {
    event.preventDefault();
    // @ts-ignore
    const { usr, pwd } = event.target;
    // @ts-ignore
    const { fields, auth } = setters;

    try {
        const DTO = { usr: usr.value, pwd: pwd.value };
        const response = await axios.post("/auth/login",
            JSON.stringify(DTO),
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            }
        );
        fields.forEach((f: any) => f(""));
        
        const sub = response?.data?.sub;
        const token = response?.data?.token;
        const claims = response?.data?.claims;
        const auther = { sub, token, claims } as Authorization;
        auth(auther);
        document.cookie = `fid=${token}; path=/; secure; max-age=3600; SameSite=Lax`;
    } catch (err: any) {
        httpError(err);
    }
}
