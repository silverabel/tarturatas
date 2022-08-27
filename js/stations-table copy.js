import { Fetcher } from "./fetcher.js";
export class StationsTable {
    static init(stations) {
        StationsTable.ROWS = [];
        stations.forEach(station => {
            const row = StationsTable.TEMPLATE.content.querySelector('tr').cloneNode(true);
            row.station = station;
            row.querySelector('td.name').innerHTML = station.description;
            StationsTable.ROWS.push(row);
        });
        StationsTable.BODY.append(...StationsTable.ROWS.values());
    }
    static setTotals(stations) {
        StationsTable.ROWS.forEach((row) => {
            const station = stations.find(s => s.id === row.station.id);
            row.querySelector('td.total').innerHTML = `${station === null || station === void 0 ? void 0 : station.primaryLockedCycleCount} + ${station === null || station === void 0 ? void 0 : station.secondaryLockedCycleCount}`;
        });
    }
    static setDetails() {
        StationsTable.ROWS.forEach((row) => {
            Fetcher.get(row.station.id).then((station) => station.lockedCycleTypeCount.forEach(({ cycleType, countPrimary, countSecondary }) => {
                row.querySelector('td.' + cycleType.toLowerCase()).innerHTML = `${countPrimary} + ${countSecondary}`;
            }));
        });
    }
}
StationsTable.BODY = document.querySelector('tbody');
StationsTable.TEMPLATE = document.querySelector('template');
