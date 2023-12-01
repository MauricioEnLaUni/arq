import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import corsOptions from "./lib/infrastructure/cors/corsOptions.js";

import { UserController } from "./api/Controllers/UserController.js";

import verifyJWT from "./lib/middleware/verifyJWT.js";
import { TokenController } from "./api/Controllers/TokenController.js";
import credentials from "./lib/middleware/credentials.js";
import { PokemonController } from "./api/Controllers/PokemonController.js";

const server = express();
const PORT = process.env.PORT || 8082;

server.use(credentials);
server.use(cors(corsOptions));
server.use(express.json());
server.use(cookieParser());

server.use("/test", (req, res) => {
    return res.status(200).json(req.body);
});
server.use("/pokemon", PokemonController);
server.use("/tokens", TokenController);
server.use("/users", UserController);
server.use(verifyJWT);

server.listen(PORT);
