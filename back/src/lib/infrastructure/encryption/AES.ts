import crypto from "node:crypto";

import { decode, encode } from "@msgpack/msgpack";
import compareUIntArrays from "../../utils/compareUIntArrays.js";
import HTTPError from "../../errors/HTTPError.js";

export default class AES {
    private static method = process.env.CRYPTO_METHOD as string;
    private static key = Buffer.from(process.env.AES_KEY as string, "utf-8");

    private static sign(data: Buffer) {
        const hmac = crypto.createHmac("sha256", AES.key).update(data).digest();
        return new Uint8Array(Buffer.concat([data, hmac]));
    }

    private static verify(data: Uint8Array, digest: Uint8Array) {
        const hmac = crypto.createHmac("sha256", AES.key);
        const h = new Uint8Array(hmac.update(data).digest());

        return compareUIntArrays(h, digest);
    }

    static encrypt(data: any) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(AES.method, AES.key, iv);
        const msg = encode(data);

        const encrypted = Buffer.concat([
            cipher.update(msg),
            cipher.final(),
            iv,
        ]);

        return AES.sign(encrypted);
    }

    static decrypt(data: Uint8Array, iv: Uint8Array) {
        const decipher = crypto.createDecipheriv(AES.method, AES.key, iv);
        const buf = Buffer.from(data);

        return Buffer.concat([decipher.update(buf), decipher.final()]);
    }

    static isSecure(data: Uint8Array) {
        const digest = data.slice(-32);
        const values = data.slice(0, -32);

        if (!AES.verify(values, digest)) {
            return new HTTPError("HMAC doesn't match", 400);
        }

        const iv = data.slice(-48, -32);
        const d = data.slice(0, -48);
        const decrypted = AES.decrypt(d, iv);

        return decode(decrypted);
    }
}
