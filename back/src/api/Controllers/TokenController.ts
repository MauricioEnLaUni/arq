import express from "express";

import verify from "../models/refresh/verify.js";
import logout from "../models/refresh/logout.js";

const router = express.Router();

router.route("/refresh").post(verify);

router.route("/logout").post(logout);

export { router as TokenController };
