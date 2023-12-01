import "@testing-library/jest-dom/vitest";
import "../../../i18n";

import { expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";

import Register from "../Register";
import { BrowserRouter } from "react-router-dom";

test("debe mostrar una paloma", async () => {
    const user = userEvent.setup();
    const result = render(<Register />, { wrapper: BrowserRouter });
    const input = screen.getByRole("textbox", { name: "Usuario" });
    
    await user.type(input, "moe_The_first");

    const label = result.container.querySelector("#usr-status");
    const emerald = label?.classList.contains("text-emerald-700");

    expect(emerald).toBe(true);
    cleanup();
});

test("debe mostrar un mensaje de error", async () => {
    const user = userEvent.setup();
    render(<Register />, { wrapper: BrowserRouter });
    const input = screen.getByRole("textbox", { name: "Usuario" });
    
    await user.type(input, "ab");

    const label = screen.getByText(new RegExp("4 a 24 caracteres."));

    expect(label).toBeInTheDocument();
    cleanup();
});

test("debe fallar con caracteres especiales", async () => {
    const user = userEvent.setup();
    const result = render(<Register />, { wrapper: BrowserRouter });
    const input = screen.getByRole("textbox", { name: "Usuario" });
    
    await user.type(input, "$$$$");

    const label = result.container.querySelector("#usr-status");
    const rose = label?.classList.contains("text-rose-700");

    expect(rose).toBe(true);
    cleanup();
});

test("debe prohibir ingresar espacios en el cuadro de usuario", async () => {
    const user = userEvent.setup();
    render(<Register />, { wrapper: BrowserRouter });
    const input = screen.getByRole("textbox", { name: "Usuario" });
    
    await user.type(input, "$$ $$");

    const label = screen.getByText("$$$$");

    expect(label).toBeInTheDocument();
    cleanup();
});
