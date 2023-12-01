import nacl from "tweetnacl";
import { decode } from "@msgpack/msgpack";

export default (payload: string) => {
    try {
        const data = Buffer.from(payload);
        const nonce = data.subarray(-24);
        const encrypted = data.subarray(0, -24);

        const key = Buffer.from(process.env.AEAD!);

        return decode(nacl.secretbox.open(encrypted, nonce, key));
    } catch (error) {
        console.error(error);
    }
}

export class AEADErrors
{

}
