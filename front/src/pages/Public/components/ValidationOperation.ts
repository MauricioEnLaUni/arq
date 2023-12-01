import { ChangeEvent, Dispatch, SetStateAction } from "react";

export type RegisterValidator = {
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fn: Dispatch<SetStateAction<string>>
    setValid: Dispatch<SetStateAction<boolean>>
}

type AuthValidation = ({ event, fn, setValid }: RegisterValidator) => undefined;

export type { AuthValidation as default };
