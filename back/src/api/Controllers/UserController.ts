import express from "express";

import verifyJWT from "../../lib/middleware/verifyJWT.js";

const router = express.Router();

router.route("/new").post((req, res) => {
    const { username, password } = req.body;

    return res.status(200).json({ username, password });
});

router.route("/auth").post((req, res) => {
    return res.status(200).json();
});
/*
router.route("/update").post(verifyJWT, update);

router.route("/get").post(verifyJWT, read);

router.route("/getOne").post(verifyJWT, one);

router.route("/del").post(verifyJWT, del);
*/
export { router as UserController };
