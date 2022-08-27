import { IStation, IStationDetail } from "./model";

export class Fetcher {

    private static URL = 'https://api.ratas.tartu.ee/cxf/am/station/';
    private static OPTIONS = { method: 'POST', body: JSON.stringify({ isPublic: true, limit: -1 }), headers: { 'Content-Type': 'application/json' }};
    private static stations: IStation[];
    private static detailMap = new Map<string, IStationDetail>();

    static async getAll(): Promise<IStation[]> {
        if (!Fetcher.stations) Fetcher.stations = (await (await fetch(Fetcher.URL + 'map/search', Fetcher.OPTIONS)).json()).results;

        return Fetcher.stations;
    }

    static async get(id: string): Promise<IStationDetail> {
        let station = Fetcher.detailMap.get(id) as IStationDetail;

        if (!station) {
            station = await (await fetch(Fetcher.URL + id)).json();
            Fetcher.detailMap.set(id, station);
        }

        return station;
    }
}