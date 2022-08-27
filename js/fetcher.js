var _a;
export class Fetcher {
}
_a = Fetcher;
Fetcher.URL = 'https://api.ratas.tartu.ee/cxf/am/station/';
Fetcher.OPTIONS = { method: 'POST', body: JSON.stringify({ isPublic: true, limit: -1 }), headers: { 'Content-Type': 'application/json' } };
Fetcher.getAll = async () => (await (await fetch(Fetcher.URL + 'map/search', Fetcher.OPTIONS)).json()).results;
Fetcher.get = async (id) => await (await fetch(Fetcher.URL + id)).json();
