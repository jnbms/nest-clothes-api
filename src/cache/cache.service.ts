import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

    setCurrentUser(user) {
        this.cacheManager.set('username', user.username)
    }
    getCurrentUser() {
        return this.cacheManager.get('username')
    }
    resetCuttentUser() {
        this.cacheManager.del('username')
    }
}
