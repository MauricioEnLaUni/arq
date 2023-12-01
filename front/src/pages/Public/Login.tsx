// React
import { useState } from "react";
// MUI
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box/Box";
import Paper from "@mui/material/Paper/Paper";
// Hooks / Functions / Context
import useAuth from "../../hooks/useAuth";
import ErrorComponent from "../../components/ErrorComponent";
import StackMember from "./components/StackMember";
import { useTranslation } from "react-i18next";
import AuthField from "./components/AuthField";
import Button from "../../components/Button";

import LoginFields from "./components/LoginFields";
import { Link } from "react-router-dom";

const page = "publicRoutes.login.";
const fields = Array.from(LoginFields);

const SubmitLogin = () => console.log("a");

export default () => {
  const { t } = useTranslation();
  const { setAuth } = useAuth();

  const [msg, setMsg] = useState<string | undefined>();

  return (
      <Box className="mt-12 mx-auto sx:w-9/12 lg:w-6/12" >
          { msg && <ErrorComponent msg={ msg } toggle={ setMsg } />}
        <Paper elevation={4} sx={{ borderRadius: "4%" }}>
            <Stack className={"border-2 border-stone-900 rounded-5xl"}>
                <StackMember>
                    <h1 className="font-5xl font-extrabold border-b-2 border-cyan-100 font-sans">{ t(`${ page }title`) }</h1>
                </StackMember>
                <form onSubmit={() => SubmitLogin()}>
                    { fields.map(e => (
                      <AuthField
                          key={e[0]}
                          props={{ ... e[1].fields, label: e[0] }}
                      />
                    ))}
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
  );
}
