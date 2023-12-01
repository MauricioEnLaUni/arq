import { RegisterValidator } from "./ValidationOperation";

const path = "register.fields.";
const fields = [
    { id: "usr", autoComplete: "off" },
    { type: "password", id: "pwd" },
]
const regexs = [
    /^[A-z][A-z0-9-_]{3,23}$/,
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
