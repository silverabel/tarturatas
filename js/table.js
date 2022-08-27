import { Fetcher } from "./fetcher.js";
import { Storage } from "./storage.js";
export class Table {
    static init() {
        Storage.get().forEach((station) => {
            const row = Table.TEMPLATE.content.querySelector('tr').cloneNode(true);
            row.station = station;
            row.querySelector('td.name').innerHTML = station.description;
            Table.ROWS.push(row);
        });
        Table.BODY.append(...Table.ROWS.values());
    }
    static setTotals(stations) {
        Table.ROWS.forEach((row) => {
            const station = stations.find(s => s.id === row.station.id);
            row.querySelector('td.total').innerHTML = `${station === null || station === void 0 ? void 0 : station.primaryLockedCycleCount} + ${station === null || station === void 0 ? void 0 : station.secondaryLockedCycleCount}`;
        });
    }
    static setDetails() {
        Table.ROWS.forEach((row) => {
            Fetcher.get(row.station.id).then(({ lockedCycleTypeCount }) => lockedCycleTypeCount.forEach(({ cycleType, countPrimary, countSecondary }) => {
                row.querySelector('td.' + cycleType.toLowerCase()).innerHTML = `${countPrimary} + ${countSecondary}`;
            }));
        });
    }
}
Table.BODY = document.querySelector('tbody');
Table.TEMPLATE = document.querySelector('template');
Table.ROWS = [];
