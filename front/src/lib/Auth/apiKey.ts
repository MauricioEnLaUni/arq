import { Buffer } from "buffer";
import nacl from "tweetnacl";

const rb = (n: number) => nacl.randomBytes(n);
const key = Buffer.from(import.meta.env.VITE_CHACHA_20_KEY!, "hex");

export const encrypt = (payload: Buffer) => {
    try {
        const nonce = rb(24);
        return Buffer.concat([
            nacl.secretbox(payload, nonce, key),
            nonce
        ]).toString("hex");
    } catch (error) {
        console.error(error);
    }
};
