import { IStation } from "./model";

export class Storage {

    private static KEY = 'stations';

    static get = (): Set<IStation> => new Set(JSON.parse(localStorage.getItem(Storage.KEY) || '[]') as IStation[]);
    static add = (station: IStation): void => Storage.set([...Storage.get(), { id: station.id, description: station.description }]);

    static remove = (station: IStation) => {
        const stations: Set<IStation> = Storage.get();
        stations.delete(station);
        
        Storage.set([...stations]);
    }

    private static set = (stations: IStation[]): void => localStorage.setItem(Storage.KEY, JSON.stringify(stations));
}
