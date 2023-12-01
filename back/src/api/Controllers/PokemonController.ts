import express from "express";

import singlePokemon from "../models/pokemon/singlePokemon.js";
import page from "../models/pokemon/page.js";

const router = express.Router();

router.route("/").get(page);

router.route("/:id").get(singlePokemon);

router.route("/:id").post(catch);

export { router as PokemonController };
