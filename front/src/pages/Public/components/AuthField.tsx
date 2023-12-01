import { useState } from "react";

import TextField, { TextFieldProps } from "@mui/material/TextField";

import StackMember from "./StackMember";
import { useTranslation } from "react-i18next";
import sentenceCase from "../../../lib/sentenceCase";

type Props = {
    props: TextFieldProps;
};

export default ({ props }: Props) => {
    const { t } = useTranslation();
    const [field, fn] = useState<string>("");
    const desc = `${props.id}-note`;

    return(
        <StackMember>
            <TextField
                { ... props }
                name={ props.id }
                label={ sentenceCase(t(`publicRoutes.${ props.label }`)) }
                value={field}
                type={props.type ?? "text" }
                onChange={(event) => fn(event.target.value)}
                aria-describedby={ desc }
                className={`${ props.className } w-9/12`}
                margin={"dense"}
                autoComplete="off"/>
        </StackMember>
    );
};
