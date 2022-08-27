import { IStation, IStationDetail } from "./model";

export class Fetcher {

    private static URL = 'https://api.ratas.tartu.ee/cxf/am/station/';
    private static OPTIONS = { method: 'POST', body: JSON.stringify({ isPublic: true, limit: -1 }), headers: { 'Content-Type': 'application/json' }};

    static getAll = async (): Promise<IStation[]> => (await (await fetch(Fetcher.URL + 'map/search', Fetcher.OPTIONS)).json()).results;
    static get = async (id: string): Promise<IStationDetail> => await (await fetch(Fetcher.URL + id)).json();
}