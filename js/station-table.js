import { Fetcher } from "./fetcher.js";
import { LocalStorage } from "./storage.js";
export class StationTable {
    static init() {
        LocalStorage.groups.flatMap(group => group.stations).forEach(station => {
            station && !StationTable.rows.has(station.id) && StationTable.addRow(station);
        });
    }
    static setGroup(group) {
        var _a;
        [...StationTable.rows.values()].forEach(row => row.remove());
        (_a = group.stations) === null || _a === void 0 ? void 0 : _a.map(({ id }) => StationTable.rows.get(id)).forEach(row => StationTable.body.insertBefore(row, StationTable.body.firstChild));
    }
    static addStation(station) {
        if (!StationTable.rows.has(station.id)) {
            StationTable.addRow(station);
            StationTable.setTotals(station);
        }
        StationTable.body.insertBefore(StationTable.rows.get(station.id), StationTable.body.firstChild);
    }
    static setTotals(...stations) {
        StationTable.rows.forEach((row) => {
            const station = stations.find(s => s.id === row.station.id);
            if (station)
                row.querySelector('td.total').innerHTML = `${station === null || station === void 0 ? void 0 : station.primaryLockedCycleCount} + ${station === null || station === void 0 ? void 0 : station.secondaryLockedCycleCount}`;
        });
    }
    static setDetails(row) {
        Fetcher.get(row.station.id).then((station) => station.lockedCycleTypeCount.forEach(({ cycleType, countPrimary, countSecondary }) => {
            row.querySelector('td.' + cycleType.toLowerCase()).innerHTML = `${countPrimary} + ${countSecondary}`;
        }));
    }
    static setHidden(hidden) {
        StationTable.container.hidden = hidden;
    }
    static addRow(station) {
        const row = StationTable.template.content.querySelector('tr').cloneNode(true);
        row.station = station;
        row.querySelector('td.name').innerHTML = station.description;
        row.onclick = () => confirm('Kustuta?') && StationTable.remove(row);
        StationTable.setDetails(row);
        StationTable.rows.set(station.id, row);
    }
    static remove(row) {
        LocalStorage.removeStation(row.station);
        row.remove();
    }
}
StationTable.container = document.querySelector('#station-container');
StationTable.body = StationTable.container.querySelector('tbody');
StationTable.template = StationTable.container.querySelector('template');
StationTable.rows = new Map();
