export class Fetcher {
    static async getAll() {
        if (!Fetcher.stations)
            Fetcher.stations = (await (await fetch(Fetcher.URL + 'map/search', Fetcher.OPTIONS)).json()).results;
        return Fetcher.stations;
    }
    static async get(id) {
        let station = Fetcher.detailMap.get(id);
        if (!station) {
            station = await (await fetch(Fetcher.URL + id)).json();
            Fetcher.detailMap.set(id, station);
        }
        return station;
    }
}
Fetcher.URL = 'https://api.ratas.tartu.ee/cxf/am/station/';
Fetcher.OPTIONS = { method: 'POST', body: JSON.stringify({ isPublic: true, limit: -1 }), headers: { 'Content-Type': 'application/json' } };
Fetcher.detailMap = new Map();
