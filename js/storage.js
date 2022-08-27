export class Storage {
}
Storage.KEY = 'stations';
Storage.get = () => new Set(JSON.parse(localStorage.getItem(Storage.KEY) || '[]'));
Storage.add = (station) => Storage.set([...Storage.get(), { id: station.id, description: station.description }]);
Storage.remove = (station) => {
    const stations = Storage.get();
    stations.delete(station);
    Storage.set([...stations]);
};
Storage.set = (stations) => localStorage.setItem(Storage.KEY, JSON.stringify(stations));
