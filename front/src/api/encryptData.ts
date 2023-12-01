import { Buffer } from "buffer";
import { InternalAxiosRequestConfig } from "axios";

import { encode } from "@msgpack/msgpack";
import { encrypt } from "../lib/Auth/apiKey";

const prepare = (data: unknown) => {
    const msg = encode(data);
    return encrypt(Buffer.from(msg));
}

export default (config: InternalAxiosRequestConfig<any>) => {
    const d = config.data;
    if (d) {
        config.data = prepare(d);
    }

    return config;
}