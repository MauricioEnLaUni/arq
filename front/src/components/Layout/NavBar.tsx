import { Link } from "react-router-dom";

import Stack from "@mui/material/Stack/Stack";
import Box from "@mui/material/Box/Box";
import Divider from "@mui/material/Divider/Divider";

import data from "../../assets/data/data";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
    const { auth } = useAuth();

    const buttons = auth ? 0 : 1;

    return (
        <Stack
            direction={"column"}
            className="flex justify-end w-full items-center"
            spacing={1.25}>
            <Stack
                direction={"row"}
                spacing={2}
                className="bg-purple-700 text-teal-200 px-3 w-full rounded flex justify-end  items-center">
                {data[buttons].contents.map((e, i) => (
                    <Stack key={`${i}-session`} className="flex">
                        <Link
                            to={e.to}
                            className="text-md py-1 font-bold leading-3 hover:text-teal-100">
                            {e.text}
                        </Link>
                        <Divider orientation={"vertical"} />
                    </Stack>
                ))}
            </Stack>
            <Stack
                direction={"row"}
                spacing={1}
                className="flex justify-end h-full w-full items-center pr-20">
                {data[2].contents.map((e: any, i: number) => (
                    <Box
                        key={`${i}-nav-links`}
                        className="flex space-evenly items-center w-full justify-end">
                        <Link
                            to={e.to}
                            className="font-bold bg-cyan-800 px-5 hover:bg-cyan-600 hover:text-stone-900 text-stone-200">
                            {e.text}
                        </Link>
                        <Divider orientation={"vertical"} />
                    </Box>
                ))}
            </Stack>
        </Stack>
    );
};

export default NavBar;
