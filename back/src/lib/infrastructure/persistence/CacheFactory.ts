import axios from "axios";

export interface IFactory
{
    getResource({ key, url, }: { key: string, url: string, }): Promise<unknown>;

    map(data: any): unknown;

    insert({ key, url });
}

class PkmCache<T> implements IFactory
{
    public cache = new Map<string, T>();

    private mapper: (data: any) => T;

    constructor(mapper: (data: any) => T)
    {
        this.mapper = mapper;
    }

    public async insert({ key, url, })
    {
        const { data } = await axios.get(url);
        const resource: T = this.map(data);
        this.cache.set(key, resource);
    }

    public async getResource({ key, url, })
    {
        if (!this.cache.has(key))
        {
            await this.insert({ key, url });
        }
        
        return this.cache.get(key);
    }

    map(data: any): T
    {
        return this.mapper(data) as T;
    }

    has(key: string)
    {
        return this.cache.has(key);
    }
}

export default PkmCache;
