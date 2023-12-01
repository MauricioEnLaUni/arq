import crypto from "crypto";

export default async (clearText: string) => {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16);

        crypto.scrypt(clearText, salt, 32, (err, derivedKey) => {
            if (err) {
                reject(err);
            }
            resolve(`${salt.toString("hex")}:${derivedKey.toString("hex")}`);
        });
    });
};
