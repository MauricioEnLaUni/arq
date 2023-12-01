import { ReactNode } from "react";

import Container from "@mui/material/Container";

export default ({ children }: { children: ReactNode }) => (
    <Container className="text-center mb-3">
        { children }
    </Container>
);