import { ReactNode } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import {
    StyledEngineProvider,
    ThemeProvider,
    createTheme,
} from "@mui/material/styles";

export default ({
    rootElement,
    children,
}: {
    rootElement: HTMLElement;
    children: ReactNode;
}) => {
    const theme = createTheme({
        components: {
            MuiPopover: {
                defaultProps: {
                    container: rootElement,
                },
            },
            MuiPopper: {
                defaultProps: {
                    container: rootElement,
                },
            },
            MuiDialog: {
                defaultProps: {
                    container: rootElement,
                },
            },
            MuiModal: {
                defaultProps: {
                    container: rootElement,
                },
            },
        },
    });

    return (
        <StyledEngineProvider>
            <CssBaseline />
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StyledEngineProvider>
    );
};
