import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";
import { Dispatch, SetStateAction } from "react";

export default ({
    msg,
    toggle,
}: {
    msg: string;
    toggle: Dispatch<SetStateAction<string | undefined>>;
}) => {
    return (
        <Container className="border-2 border-solid border-rose-700 rounded-lg bg-red-200 shadow-2xl h-12 flex mb-2">
            <Stack
                direction="row"
                className="flex content-between gap-x-3 w-full items-center">
                <Container className="w-1/12 flex text-rose-950">
                    <ErrorIcon />
                </Container>
                <Container className="w-10/12 flex">
                    <Typography
                        aria-live="assertive"
                        className="font-semibold"
                        role={"err-msg"}>
                        {msg}
                    </Typography>
                </Container>
                <Container className="w-1/12 flex cursor-pointer text-slate-950 hover:text-cyan-100 transition-color duration-100">
                    <CloseIcon onClick={() => toggle(undefined)} />
                </Container>
            </Stack>
        </Container>
    );
};
