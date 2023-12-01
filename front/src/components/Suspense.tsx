import { Suspense, ReactNode } from "react";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

export default ({ children }: { children: ReactNode }) => (
    <Suspense
        fallback={
            <Container className="flex justify-center items-center w-full h-screen">
                <CircularProgress className="flex" size={64} />
            </Container>
        }>
        {children}
    </Suspense>
);
