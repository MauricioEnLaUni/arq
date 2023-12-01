import { useMemo } from "react";
import { SetURLSearchParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const Pagination = ({ records, display, current, setCurrent, }: { records: number, display: number, current: number, setCurrent: SetURLSearchParams, }) => {
  const pages = useMemo(() => Array(Math.ceil(records / display)).fill(undefined), [records, display]);

  const txt = (v: number) => {
    return current === v ? "text-stone-950 text-semibold bg-green-600" : "";
  }

  return (
    <Container className="w-full flex justify-center">
        <Stack direction={"row"} spacing={1}>
            { pages.map((_, i) => (
                <Button key={`page-button-${ i }`} variant="outlined" className={ `border-solid border-stone-900 ${txt(i)}` } onClick={() => setCurrent({ page: i.toString() })}>
                    { i + 1 }
                </Button>
            ))}
        </Stack>
        
    </Container>
  )
}

export default Pagination;
