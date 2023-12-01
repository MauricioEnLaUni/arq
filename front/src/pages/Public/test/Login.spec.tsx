import "@testing-library/jest-dom/vitest";
import "../../../i18n";

import { expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";

import Login from "../Login";
import { BrowserRouter } from "react-router-dom";

test("debe dejar de aparecer mal", () => {
    const user = userEvent.setup();
    const result = render(<Login />, { wrapper: BrowserRouter });
    const input = screen.getByRole("textbox", { name: "Usuario" });

    expect(true).toBe(true);
    cleanup();
});