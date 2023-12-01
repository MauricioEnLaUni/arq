import crypto, { timingSafeEqual } from "crypto";

export default async (password: string, hash: string) => {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":");
        const b = Buffer.from(key, "hex");
        crypto.scrypt(password, salt, 32, (err, derivedKey) => {
            if (err) {
                reject(err);
            }

            resolve(timingSafeEqual(b, derivedKey));
        });
    });
};
