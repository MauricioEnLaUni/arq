import React, { useState } from "react";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const a11yProps = (i: number) => ({
    "id": `${i}-tab`,
    "aria-controls": `vertical-tabpanel-${i}`,
});

export default ({ opciones }: { opciones: string[] }) => {
    const [current, setCurrent] = useState<number>(0);
    const handleChange = (_: React.SyntheticEvent, v: number) => {
        setCurrent(v);
    };

    return (
        <Container>
            <Paper elevation={12} square={false}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={current}
                    onChange={handleChange}
                    aria-label="pestañas-lecciones-react">
                    {opciones.map((t, i) => (
                        <Tab
                            label={t}
                            key={`${i}-contenido`}
                            {...a11yProps(i)}
                        />
                    ))}
                </Tabs>
                {opciones.map((t, i) => (
                    <TabPanel value={i} index={i}>
                        {t}
                    </TabPanel>
                ))}
            </Paper>
        </Container>
    );
};

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};
