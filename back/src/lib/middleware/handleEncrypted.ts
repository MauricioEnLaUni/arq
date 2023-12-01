import AES from "../infrastructure/encryption/AES.js";

export default (req, res, next) => {
    const { bytes } = req.body;
    const encrypted = new Uint8Array(bytes.split(",").map(Number));

    const exists = AES.isSecure(encrypted);

    if (exists.hasOwnProperty("isOperational")) {
        next(exists);
    }

    req.body = exists;
    next();
};
