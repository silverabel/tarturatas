import { Fetcher } from "./fetcher.js";
import { Select } from "./select.js";
import { LocalStorage } from "./storage.js";
export class StationTable {
    static async init(group) {
        var _a, _b;
        (_a = StationTable.rows) === null || _a === void 0 ? void 0 : _a.forEach(row => row.remove());
        StationTable.rows = [];
        (_b = group.stations) === null || _b === void 0 ? void 0 : _b.forEach(station => {
            const row = StationTable.template.content.querySelector('tr').cloneNode(true);
            row.station = station;
            row.querySelector('td.name').innerHTML = station.description;
            row.onclick = () => confirm('Kustuta?') && LocalStorage.removeStation(station);
            StationTable.setDetails(row);
            StationTable.body.insertBefore(row, StationTable.body.firstChild);
            StationTable.rows.push(row);
        });
        Fetcher.getAll().then((stations) => {
            if (!Select.initialized)
                Select.init(stations);
            StationTable.setTotals(stations);
        });
    }
    static setTotals(stations) {
        StationTable.rows.forEach((row) => {
            const station = stations.find(s => s.id === row.station.id);
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
}
StationTable.container = document.querySelector('#station-container');
StationTable.body = StationTable.container.querySelector('tbody');
StationTable.template = StationTable.container.querySelector('template');
