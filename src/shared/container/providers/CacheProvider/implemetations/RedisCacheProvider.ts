import Redis, { Redis as RedisClient } from 'ioredis';
import ICacheProvider from '../models/ICacheProvider';
import cacheProvider from '@config/cache';
export default class RedisCacheProvider implements ICacheProvider {
    private client: RedisClient;

    constructor() {
        console.log("Carregando cache.");
        this.client = new Redis(cacheProvider.config.redis);
    }

    public async save(key: string, value: string): Promise<void> {
        await this.client.set(key, value);
    }
    public async recover(key: string): Promise<string | null> {
        const data = await this.client.get(key);
        return data;
    }
    public async invalidate(key: string): Promise<void> { }
}