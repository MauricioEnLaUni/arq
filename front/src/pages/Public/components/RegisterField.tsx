import { useState } from "react";

import TextField, { TextFieldProps } from "@mui/material/TextField";

import Info from "./Info";
import StackMember from "./StackMember";
import ValidationUX from "./ValidationUX";
import { useTranslation } from "react-i18next";
import ValidationOperation from "./ValidationOperation";
import sentenceCase from "../../../lib/sentenceCase";

type Props = {
    props: TextFieldProps;
    validation: ValidationOperation;
    child?: string;
};

export default ({ props, validation, child }: Props) => {
    const { t } = useTranslation();
    const [field, fn] = useState<string>("");
    const [valid, setValid] = useState(false);
    const [focus, setFocus] = useState(false);
    const desc = `${props.id}-note`;

    return(
        <StackMember>
            <TextField
                error={ focus && !valid && field.length > 0 }
                { ... props }
                name={ props.id }
                label={ sentenceCase(t(`publicRoutes.${ props.label }.label`)) }
                value={field}
                type={props.type ?? "text" }
                onChange={(event) => validation({ event, fn, setValid })}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                aria-invalid={valid ? 'false' : 'true'}
                aria-describedby={ desc }
                InputProps={{
                    endAdornment:
                        field && <ValidationUX focus={ focus } valid={ valid } name={ `${ props.id }-status` }/>
                }}
                className={`${ props.className } w-9/12`}
                margin={"dense"}
                />
            { child && focus && field && !valid &&
                <Info label={ desc } info={ child } />
            }
        </StackMember>
    );
};
