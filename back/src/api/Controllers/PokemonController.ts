import express from "express";

import singlePokemon from "../models/pokemon/singlePokemon.js";
import page from "../models/pokemon/page.js";
import { throwPokeball } from "../models/pokemon/catch.js";

const router = express.Router();

router.route("/").get(page);

router.route("/:id").get(singlePokemon);

router.route("/:id").post(throwPokeball);

export { router as PokemonController };
