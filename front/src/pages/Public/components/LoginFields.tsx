import { RegisterValidator } from "./ValidationOperation";

const path = "login.fields.";
const fields = [
    { id: "usr", autoComplete: "off" },
    { type: "password", id: "pwd" }
];

export default new Map(fields.map((e, index) => {
    return [
        `${ path }${ index }`, {
            fields: e,
            operation: ({ event, fn }: RegisterValidator) => {
                const current = event.target.value;
                fn(current);
            }
        }
    ];
}) as [string, { fields: any, operation: any }][]);
