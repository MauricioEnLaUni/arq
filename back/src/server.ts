import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import verifyJWT from "./lib/middleware/verifyJWT.js";
import credentials from "./lib/middleware/credentials.js";
import corsOptions from "./lib/infrastructure/cors/corsOptions.js";

import { UserController } from "./api/Controllers/UserController.js";
import { TokenController } from "./api/Controllers/TokenController.js";
import { PokemonController } from "./api/Controllers/PokemonController.js";

const server = express();
const PORT = process.env.PORT || 8082;

server.use(credentials);
server.use(cors(corsOptions));
server.use(express.json());
server.use(cookieParser());

server.use("/pokemon", PokemonController);
server.use("/tokens", TokenController);
server.use("/users", UserController);
server.use(verifyJWT);

server.listen(PORT);
