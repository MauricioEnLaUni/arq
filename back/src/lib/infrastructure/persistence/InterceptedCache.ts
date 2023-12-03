import axios from "axios";
import { IFactory } from "./CacheFactory.js";
import { KeyUrl } from "../../models/KeyUrl.js";

class InterceptedCache<T> implements IFactory
{
    public mainCache = new Map<string, T>();

    public secondaryCache: IFactory;

    public mapper: (data: any) => T;

    private getKey: (data: T) => KeyUrl;

    constructor(cache: IFactory, mapper: (data: any) => T, secondaryMapper: (data: T) => KeyUrl)
    {
        this.secondaryCache = cache;

        this.mapper = mapper;

        this.getKey = secondaryMapper;
    }

    map(data: any): T {
        return this.mapper(data);
    }

    async insert({ key, url }: KeyUrl)
    {
        const { data } = await axios.get(url);
        const resource: T = this.map(data);
        this.mainCache.set(key, resource);

        const secondary = this.getKey(data);
        await this.secondaryCache.insert(secondary);
    }

    async getResource({ key, url, }: KeyUrl): Promise<T> {
        if (!this.mainCache.has(key))
        {
            await this.insert({ key, url });
        }

        return this.mainCache.get(key);
    }

    has(key: string)
    {
        return this.mainCache.has(key);
    }
}

export default InterceptedCache;
