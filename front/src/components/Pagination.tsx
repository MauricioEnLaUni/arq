import { SetURLSearchParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const Pagination = ({ total, current, setCurrent }: { pages: number, setCurrent: SetURLSearchParams}) => {
  return (
    <Container>
        <Stack direction={"row"}>
            { Array(total).fill(undefined).map((_, i) => (
                <Button key={`page-button-${ i }`} onClick={() => setCurrent(i)}>
                    { i + 1 }
                </Button>
            ))}
        </Stack>
        
    </Container>
  )
}

export default Pagination;
