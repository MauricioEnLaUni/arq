import { RegisterValidator } from "./ValidationOperation";

const path = "register.fields.";
const fields = [
    { id: "username", autoComplete: "off" },
    { id: "password", type: "password" },
]
const regexs = [
    /^[A-z][A-z0-9-_]{2,23}$/,
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
];

const vals = regexs.map((r, index) => {
    return [
        `${ path }${ index }`, {
            fields: fields[index],
            operation: ({ event, fn, setValid }: RegisterValidator) => {
            const current = event.target.value;
            fn(current);

            if (r.test(current)) {
                setValid(true);
            } else {
                setValid(false);
            }
        }}
    ]
}) as [string, { fields: any, operation: any }][];

export default new Map(vals);
