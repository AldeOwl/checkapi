
export default class Data {

    _baseUrl = 'https://api.2ip.ua/geo.json?ip=';

    async getData(ip) {
        const res = await fetch(`${this._baseUrl}${ip}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${res.status}`)
        }
        return await res.json();
    }
    async getGeo(ip) {
        return await this.getData(ip);
    }
}