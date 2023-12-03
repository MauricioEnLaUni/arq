import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import "./i18n.ts";

import TanstackQuery from "./Providers/TanstackQuery.tsx";
import Theme from "./Providers/Theme.tsx";
import Suspense from "./components/Suspense.tsx";
import AuthProvider from "./Providers/AuthProvider.tsx";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <Suspense>
            <Theme rootElement={root}>
                <TanstackQuery>
                    <AuthProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/*" element={<App />} />
                            </Routes>
                        </BrowserRouter>
                    </AuthProvider>
                </TanstackQuery>
            </Theme>
        </Suspense>
    </React.StrictMode>,
);
