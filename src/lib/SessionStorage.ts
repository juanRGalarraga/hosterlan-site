interface SessionStorageParams{
    key: string;
    value: string|object;
    ttlInMinutes: number;
}

export const TTL = 60;


export default class SessionStorage {

    static setItem({ key, value, ttlInMinutes }: SessionStorageParams) {
         console.log("Set Item " + key, value, ttlInMinutes);
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + (ttlInMinutes * 60 * 1000)
        };
        console.log("Set Item " + key, item);
        
        sessionStorage.setItem(key, JSON.stringify(item));
        return self;
    }

    static getItem(key: string) {
        const itemStr = sessionStorage.getItem(key);

        if (!itemStr) {
            return null;
        }

        try {
            const item = JSON.parse(itemStr);
            const now = new Date();

            if (now.getTime() > item.expiry) {
                sessionStorage.removeItem(key);
                return null;
            }

            return item.value;
        } catch (error) {
            console.error(error)
            sessionStorage.removeItem(key);
            return null;
        }
    }

    static removeItem(key:string) {
        sessionStorage.removeItem(key);
    }

    static hasValidItem(key:string) {
        return this.getItem(key) !== null;
    }

    static cleanExpired() {
        const keys = Object.keys(sessionStorage);
        keys.forEach(key => {
            this.getItem(key);
        });
    }
}