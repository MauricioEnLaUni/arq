import express from "express";

import HandleCreateUser from "../models/user/Handlers/HandleCreateUser.js";
import HandleLogin from "../models/refresh/Handlers/HandleLogin.js";

const router = express.Router();

router.route("/new").post(async (req, res) => {
    const { username, password } = req.body;

    const handler = new HandleCreateUser(username, password);
    const newUser = await handler.handle();

    if (newUser.isFailure()) {
        return res.status(500).json(newUser);
    }

    return res.status(200).json(newUser);
});

router.route("/auth").post(async (req, res) => {
    const { username, password } = req.body;

    const handler = new HandleLogin(username, password);
    const auth = await handler.handle();
    if (auth.isFailure()) {
        return res.status(500).json(auth);
    }

    const {} = auth.value;

    return res.status(200).json();
});
/*
router.route("/update").post(verifyJWT, update);

router.route("/get").post(verifyJWT, read);

router.route("/getOne").post(verifyJWT, one);

router.route("/del").post(verifyJWT, del);
*/
export { router as UserController };
