/// <reference types="vitest" />
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import plugin from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./test/setup.ts",
        exclude: [...configDefaults.exclude, "packages/template/*"],
        reporters: ["html"],
    },
});
