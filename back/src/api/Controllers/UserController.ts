import express from "express";

import auth from "../models/user/auth.js";
import create from "../models/user/create.js";
import update from "../models/user/update.js";
import read from "../models/user/read.js";
import one from "../models/user/one.js";
import del from "../models/user/del.js";

import verifyJWT from "../../lib/middleware/verifyJWT.js";

const router = express.Router();

router.route("/new").post(create);

router.route("/auth").post(auth);

router.route("/update").post(verifyJWT, update);

router.route("/get").post(verifyJWT, read);

router.route("/getOne").post(verifyJWT, one);

router.route("/del").post(verifyJWT, del);

export { router as UserController };
