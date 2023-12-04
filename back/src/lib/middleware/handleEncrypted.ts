import nacl from "tweetnacl";
import { decode } from "@msgpack/msgpack";

export default (req, res, next) => {
    const payload = req.body;

    try {
        const data = Buffer.from(payload);
        const nonce = data.subarray(-24);
        const encrypted = data.subarray(0, -24);

        const key = Buffer.from(process.env.AEAD!);

        req.body = decode(nacl.secretbox.open(encrypted, nonce, key));
    } catch (error) {
        console.error(error);
        next(error);
    }

    next();
};
