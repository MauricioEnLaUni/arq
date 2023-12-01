// React
import { useState } from "react";
import { Link } from "react-router-dom";

// MUI
import Paper from "@mui/material/Paper/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// Custom
import StackMember from "./components/StackMember";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";

import RegisterFields from "./components/RegisterFields";
import AuthField from "./components/RegisterField";
import SubmitRegister from "./components/SubmitRegister";
import ErrorComponent from "../../components/ErrorComponent";
import useAuth from "../../hooks/useAuth";

const page = "publicRoutes.register.";

const Register = () => {
    const { setAuth } = useAuth();
    const fields = Array.from(RegisterFields);
    const { t } = useTranslation();
    const [msg, setMsg] = useState<string | undefined>();

    return (
    <Box className="mt-12 mx-auto sx:w-9/12 lg:w-6/12" >
        { msg && <ErrorComponent msg={ msg } toggle={ setMsg } /> }
        <Paper elevation={4} className="rounded-5xl border-2">
            <Stack className={"border-2 border-stone-900 rounded-5xl"}>
                <StackMember>
                    <h1 className="font-5xl font-extrabold border-b-2 border-cyan-100 font-sans">{ t(`${ page }title`) }</h1>
                </StackMember>

                <form onSubmit={(event) => SubmitRegister(event, { auth: setAuth, error: setMsg })}>
                    { fields.map(e => (
                        <AuthField
                            key={e[0]}
                            props={{ ...e[1].fields, label: e[0] }}
                            validation={e[1].operation}
                            child={`${ e[0] }.note`} />))}
                    <StackMember>
                        <Button
                            text={"interface.confirm.1"}
                            props={{ type: "submit" }} />
                    </StackMember>
            </form>
            <StackMember>
                <hr />
            </StackMember>
            <StackMember>
                <p>
                    { t(`${ page }nav.title`) }
                    <br />
                    <span>
                        <Link className="text-blue-600 font-lg font-semibold" to="/">{ t(`${ page }nav.action`) }</Link>
                    </span>
                </p>
            </StackMember>
            </Stack>
        </Paper>
    </Box>
    )
}

export default Register;
